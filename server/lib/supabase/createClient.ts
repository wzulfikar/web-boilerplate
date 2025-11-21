import { createServerClient as createClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseConfig } from '~/src/config/supabase'
import type { Database } from '~/supabase/database.types'

export async function createServerClient() {
  const cookieStore = await cookies()
  return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
