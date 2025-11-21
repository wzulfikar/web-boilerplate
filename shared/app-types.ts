import type {
  UserAppMetadata as SupabaseUserAppMetadata,
  User,
} from '@supabase/supabase-js'

export type UserAppMetadata = {
  exampleField?: string
}

export interface AppUser extends User {
  app_metadata: SupabaseUserAppMetadata & {
    _app?: UserAppMetadata
  }
}
