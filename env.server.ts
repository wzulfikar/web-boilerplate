import { vercel } from '@t3-oss/env-core/presets-zod'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { env as clientEnv } from './env.client'

/**
 * Access type-safe environment variables for server and client runtime
 */
export const env = createEnv({
  server: {
    PRODUCTION_URL: z.url(),
    SUPABASE_SECRET_KEY: z.string().optional(),
  },
  extends: [vercel(), clientEnv],
  isServer: typeof window === 'undefined',

  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // runtimeEnv: {
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  // },
  // For Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: process.env,
})
