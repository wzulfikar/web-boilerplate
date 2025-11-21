import { env } from '~/env.server'

export const supabaseServerConfig = {
  secretKey: env.SUPABASE_SECRET_KEY,
}
