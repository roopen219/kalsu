// Extend CloudflareBindings with env vars/secrets not auto-generated
declare global {
  interface CloudflareBindings {
    TURNSTILE_SITE_KEY: string  // Public, in wrangler.jsonc vars
    TURNSTILE_SECRET: string    // Secret, set via wrangler secret put
  }
}

export {}

