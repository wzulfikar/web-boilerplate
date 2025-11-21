// TODO: generate supabase types

import type { SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = any

export type SupabaseClientDatabase = SupabaseClient<Database>
