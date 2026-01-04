// Extend CloudflareBindings with secrets not in wrangler.jsonc
declare global {
  interface CloudflareBindings {
    TURNSTILE_SECRET: string
  }
}

export {}

