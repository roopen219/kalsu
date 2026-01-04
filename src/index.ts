import { DurableObject } from 'cloudflare:workers'
import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'
import { generatePassphrase } from './words'

// Passphrase validation: word-word-word-word format, max 100 chars
const isValidPassphrase = (p: string): boolean => 
  /^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/.test(p) && p.length < 100

// Turnstile verification
interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
}

// Cloudflare Turnstile test keys for local development
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000BB' // Always passes (invisible widget)
const TURNSTILE_TEST_SECRET = '1x0000000000000000000000000000000AA' // Always passes validation

async function verifyTurnstile(token: string, secret: string, ip: string): Promise<boolean> {
  // In local development with test keys, always return true (skip API call)
  if (secret === TURNSTILE_TEST_SECRET) {
    console.log('Local development: Using Turnstile test key (always passes)')
    return true
  }
  
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: ip
      })
    })
    const data = await response.json() as TurnstileResponse
    return data.success
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

// Hono App
const app = new Hono<{ Bindings: CloudflareBindings }>()

// Security headers middleware - exclude WebSocket and API routes
app.use(
  '*',
  async (c, next) => {
    // Skip security headers for WebSocket upgrades and API routes
    if (c.req.path.startsWith('/ws/') || c.req.path.startsWith('/api/')) {
      return next()
    }
    return secureHeaders({
      contentSecurityPolicy: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://unpkg.com', 'https://cdn.jsdelivr.net', 'https://challenges.cloudflare.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: ["'self'", 'wss:', 'ws:', 'https://challenges.cloudflare.com'],
        frameSrc: ['https://challenges.cloudflare.com'],
        childSrc: ['https://challenges.cloudflare.com'],
        imgSrc: ["'self'", 'data:', 'https://challenges.cloudflare.com'],
        objectSrc: ["'none'"],
      },
    })(c, next)
  }
)

// API: Get public config (Turnstile site key)
app.get('/api/config', (c) => {
  const isDevelopment = c.env.APP_ENV === 'development'
  const siteKey = isDevelopment ? TURNSTILE_TEST_SITE_KEY : c.env.TURNSTILE_SITE_KEY
  
  return c.json({
    turnstileSiteKey: siteKey
  })
})

// API: Generate passphrase (rate limited)
app.get('/api/passphrase', async (c) => {
  const isDevelopment = c.env.APP_ENV === 'development'
  
  // For rate limiting, use IP or fallback to localhost in development
  const ip = c.req.header('cf-connecting-ip') || (isDevelopment ? '127.0.0.1' : null)
  if (!ip) {
    return c.json({ error: 'Unable to identify client.' }, 400)
  }
  
  const { success } = await c.env.PASSPHRASE_RATE_LIMITER.limit({ key: ip })
  if (!success) {
    return c.json({ error: 'Rate limit exceeded. Try again later.' }, 429)
  }

  const passphrase = generatePassphrase(4)
  return c.json({ passphrase })
})

// WebSocket upgrade route (Turnstile protected)
app.get('/ws/:passphrase', async (c) => {
  const upgradeHeader = c.req.header('Upgrade')
  if (!upgradeHeader || upgradeHeader !== 'websocket') {
    return c.text('Expected Upgrade: websocket', 426)
  }

  const isDevelopment = c.env.APP_ENV === 'development'
  
  // Skip Turnstile verification in development
  if (!isDevelopment) {
    // Verify Turnstile token from query parameter
    const turnstileToken = c.req.query('token')
    if (!turnstileToken) {
      return c.text('Security verification required', 403)
    }

    const ip = c.req.header('cf-connecting-ip')
    if (!ip) {
      return c.text('Unable to identify client', 400)
    }

    const isValid = await verifyTurnstile(turnstileToken, c.env.TURNSTILE_SECRET, ip)
    if (!isValid) {
      return c.text('Security verification failed', 403)
    }
  }

  const passphrase = c.req.param('passphrase')
  if (!isValidPassphrase(passphrase)) {
    // Accept WebSocket but send error message and close
    // This allows frontend to get clear error info
    const pair = new WebSocketPair()
    const [client, server] = [pair[0], pair[1]]
    server.accept()
    server.send(JSON.stringify({ type: 'error', code: 'INVALID_CODE', message: 'Invalid code format.' }))
    server.close(4001, 'Invalid code')
    return new Response(null, { status: 101, webSocket: client })
  }

  // Check role parameter - receivers must have a sender waiting
  const role = c.req.query('role')
  
  try {
    // Get the Durable Object stub by passphrase name
    const id = c.env.SIGNALING.idFromName(passphrase)
    const stub = c.env.SIGNALING.get(id)
    
    // For receivers, verify a sender exists before allowing connection
    if (role === 'receiver') {
      try {
        const statusResponse = await stub.fetch(new Request('https://internal/status'))
        const statusData = await statusResponse.json() as { exists: boolean; peerCount: number }
        
        // Receiver can only connect if sender exists (peerCount > 0)
        if (!statusData.exists || statusData.peerCount === 0) {
          // Accept WebSocket but send error message and close
          // This allows frontend to get clear error info
          const pair = new WebSocketPair()
          const [client, server] = [pair[0], pair[1]]
          server.accept()
          server.send(JSON.stringify({ type: 'error', code: 'INVALID_CODE', message: 'Invalid code. No sender found with this code.' }))
          server.close(4001, 'Invalid code')
          return new Response(null, { status: 101, webSocket: client })
        }
      } catch (statusError) {
        console.error('Status check failed:', statusError)
        // Accept WebSocket but send error message and close
        const pair = new WebSocketPair()
        const [client, server] = [pair[0], pair[1]]
        server.accept()
        server.send(JSON.stringify({ type: 'error', code: 'SERVER_ERROR', message: 'Could not verify code. Please try again.' }))
        server.close(4002, 'Server error')
        return new Response(null, { status: 101, webSocket: client })
      }
    }
    // Senders always allowed (they create the session)
    
    // Forward the request directly to the Durable Object
    return stub.fetch(c.req.raw)
  } catch (error) {
    console.error('WebSocket upgrade error:', error)
    return c.text('WebSocket upgrade failed', 500)
  }
})

export default app

// Durable Object with WebSocket Hibernation
export class SignalingRoom extends DurableObject<CloudflareBindings> {
  sessions: Map<WebSocket, { id: string }>

  constructor(ctx: DurableObjectState, env: CloudflareBindings) {
    super(ctx, env)
    this.sessions = new Map()

    // Restore sessions from hibernation
    this.ctx.getWebSockets().forEach((ws) => {
      const attachment = ws.deserializeAttachment() as { id: string } | null
      if (attachment) {
        this.sessions.set(ws, attachment)
      }
    })

    // Auto ping/pong without waking the DO
    this.ctx.setWebSocketAutoResponse(
      new WebSocketRequestResponsePair('ping', 'pong')
    )
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const currentPeerCount = this.ctx.getWebSockets().length

    // Handle status check (non-WebSocket request)
    if (url.pathname === '/status') {
      return Response.json({ 
        exists: currentPeerCount > 0, 
        peerCount: currentPeerCount 
      })
    }

    // WebSocket upgrade handling below
    // Max 2 peers per connection for P2P transfer
    if (currentPeerCount >= 2) {
      return new Response('Connection limit reached', { status: 429 })
    }

    // Create WebSocket pair
    const pair = new WebSocketPair()
    const [client, server] = [pair[0], pair[1]]

    // Generate session ID
    const id = crypto.randomUUID()

    // Accept the WebSocket with hibernation support
    this.ctx.acceptWebSocket(server)
    server.serializeAttachment({ id })
    this.sessions.set(server, { id })

    // Set 10-minute auto-shutdown alarm (only on first connection)
    const existingAlarm = await this.ctx.storage.getAlarm()
    if (!existingAlarm) {
      await this.ctx.storage.setAlarm(Date.now() + 10 * 60 * 1000)
    }

    return new Response(null, { status: 101, webSocket: client })
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    // Only handle string messages
    if (typeof message !== 'string') return

    // Enforce max message size (64KB - SDP offers are typically <10KB)
    if (message.length > 65536) {
      ws.close(1009, 'Message too large')
      return
    }

    // Handle disconnect request
    if (message === 'disconnect') {
      ws.close(1000, 'Disconnected')
      return
    }

    // Broadcast to all OTHER peers (signaling relay)
    this.sessions.forEach((_, connectedWs) => {
      if (connectedWs !== ws && connectedWs.readyState === WebSocket.OPEN) {
        connectedWs.send(message)
      }
    })
  }

  async webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean): Promise<void> {
    this.sessions.delete(ws)
    
    // Notify remaining peers that a peer disconnected
    this.sessions.forEach((_, connectedWs) => {
      if (connectedWs.readyState === WebSocket.OPEN) {
        try { 
          connectedWs.send(JSON.stringify({ type: 'peer-disconnected' })) 
        } catch (e) { /* ignore send errors */ }
      }
    })
  }

  async webSocketError(ws: WebSocket, error: unknown): Promise<void> {
    this.sessions.delete(ws)
    try { ws.close(1011, 'WebSocket error') } catch (e) { /* already closed */ }
  }

  async alarm(): Promise<void> {
    // Close all remaining connections when room expires
    this.sessions.forEach((_, ws) => {
      try { ws.close(1000, 'Room expired') } catch (e) { /* already closed */ }
    })
    // DO will be garbage collected after this
  }
}
