import type { AppUser } from 'saas-maker'
import { createServerClient } from '~/server/lib/supabase/createClient'
import type { SupabaseClientDatabase } from '~/supabase/database.types'

export const getUser = async (
  supabase?: SupabaseClientDatabase,
): Promise<AppUser | null> => {
  supabase ??= await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
