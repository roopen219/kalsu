// Extend CloudflareBindings with secrets (set via wrangler secret put)
declare global {
  interface CloudflareBindings {
    TURNSTILE_SITE_KEY: string  // Turnstile site key
    TURNSTILE_SECRET: string    // Turnstile secret key
  }
}

export { }

