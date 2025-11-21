import { createClient } from '@supabase/supabase-js'
import { supabaseServerConfig } from '~/server/config/supabase'
import { supabaseConfig } from '~/src/config/supabase'

// TODO: generate Supabase types and replace `any` type in createClient with the `Database`
// import type { Database } from '~/supabase/database.types'

/**
 * Supabase Admin Client. It uses the service key to access the API to bypass Row Level Security.
 * @see https://supabase.com/docs/guides/api/api-keys#the-servicerole-key
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseAdmin = createClient<any>(
  supabaseConfig.url,
  supabaseServerConfig.secretKey,
)
