# KALSU

**Send files directly between browsers. No servers store your files.**

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/roopen219/kalsu)

🌐 **Live Demo:** [kalsu.download](https://kalsu.download)

---

## What is KALSU?

KALSU is a peer-to-peer file transfer tool that sends files directly from one browser to another using WebRTC — the same technology that powers Google Meet and other video calling apps.

### Features

- 🔒 **Private** — Files transfer directly between browsers, never touching our servers
- ⚡ **Fast** — No upload/download to a server, just direct P2P transfer
- 🌍 **No Account Required** — Just open the page and start transferring
- 📱 **Works Everywhere** — Desktop, mobile, any modern browser
- 🔓 **Open Source** — Fully transparent, self-hostable

### How It Works

1. **Sender** selects a file → gets a 4-word secret code
2. **Receiver** enters the code → connects directly to sender's browser
3. **File transfers** directly via WebRTC — our server only helps establish the connection

---

## Tech Stack

- **Runtime:** [Cloudflare Workers](https://workers.cloudflare.com/)
- **State:** [Durable Objects](https://developers.cloudflare.com/durable-objects/) (for WebSocket signaling)
- **Framework:** [Hono](https://hono.dev/)
- **P2P:** [WebRTC](https://webrtc.org/) via [SimplePeer](https://github.com/feross/simple-peer)
- **Security:** [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) (bot protection)

---

## Self-Hosting Guide

### Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)
- [Bun](https://bun.sh/) or Node.js
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### 1. Clone the Repository

```bash
git clone https://github.com/roopen219/kalsu.git
cd kalsu
bun install
```

### 2. Set Up Cloudflare Turnstile

1. Go to [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Create a new widget (choose "Managed" mode)
3. Add your domain (e.g., `your-domain.com`)
4. Copy the **Site Key** and **Secret Key**

### 3. Configure Secrets

Set both Turnstile keys as secrets:

```bash
wrangler secret put TURNSTILE_SITE_KEY
# Paste your Turnstile site key when prompted

wrangler secret put TURNSTILE_SECRET
# Paste your Turnstile secret key when prompted
```

### 4. Deploy

```bash
bun run deploy
```

Or use the [Deploy Button](#kalsu) above for one-click deployment.

---

## Development

### Local Development

```bash
bun install
bun run dev
```

Note: Turnstile verification requires a deployed environment. For local testing, you may need to temporarily disable Turnstile checks or use Turnstile's test keys.

### Generate Types

After modifying `wrangler.jsonc`:

```bash
bun run cf-typegen
```

---

## Secrets

Both values are set via `wrangler secret put`:

| Secret | Description |
|--------|-------------|
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET` | Cloudflare Turnstile secret key |

Get both from [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile).

---

## Project Structure

```
kalsu/
├── public/
│   ├── index.html      # Main application
│   ├── privacy.html    # Privacy policy
│   └── terms.html      # Terms of use
├── src/
│   ├── index.ts        # Hono app + Durable Object
│   ├── words.ts        # Passphrase generation
│   └── env.d.ts        # Type declarations
├── wrangler.jsonc      # Cloudflare Workers config
└── package.json
```

---

## Security

- **No file storage** — Files transfer directly via WebRTC
- **Encrypted connections** — WebRTC uses DTLS encryption
- **Bot protection** — Cloudflare Turnstile prevents abuse
- **Rate limiting** — Prevents brute-force attacks on codes
- **10-minute expiry** — Connection codes auto-expire

See our [Privacy Policy](https://kalsu.download/privacy.html) for details.

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## Acknowledgments

- [SimplePeer](https://github.com/feross/simple-peer) — WebRTC abstraction
- [StreamSaver.js](https://github.com/nicejs-is-cool/nicejs-is-cool.github.io) — Client-side file saving
- [Hono](https://hono.dev/) — Web framework for Workers
- [Cloudflare](https://cloudflare.com/) — Infrastructure

---

Made with ❤️ for the open web.
