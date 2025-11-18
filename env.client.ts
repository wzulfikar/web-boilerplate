import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

/**
 * Access type-safe environment variables for client runtime
 */
export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.url().default('http://localhost:3000'),
    NEXT_PUBLIC_PRODUCTION_URL: z.url().default('https://example.com'),
    NEXT_PUBLIC_SUPABASE_URL: z.url().default('http://localhost:54321'),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,

    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  },
})
