import { createClient } from '@supabase/supabase-js'

import type { Database } from '~/supabase/database.types'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL_PROD!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_PROD!

if (!url || !serviceKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL_PROD and SUPABASE_SERVICE_ROLE_KEY_PROD must be set when using `supabaseAdminProd`',
  )
}

/**
 * Supabase Admin client for production environment.
 * ONLY USE THIS to run adhoc scripts for production environment locally.
 */
export const supabaseAdminProd = createClient<Database>(url, serviceKey)
