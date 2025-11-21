import { AppError, type AppUser, unwrapData } from 'saas-maker'
import type { z } from 'zod'
import type {
  Database,
  SupabaseClientDatabase,
} from '~/supabase/database.types'

/** Map type from route's `inferRouteType` to the type that we use in `apiClient` */
export type RouteType<
  T extends {
    path: string
    input: {
      body?: Record<string, unknown>
      query?: Record<string, unknown>
    }
    returnValue: {
      data?: unknown
      error?: { message: string; code: string } | null
    }
  },
> = {
  path: T['path']
  input: {
    [k in keyof T['input']['query']]: T['input']['query'][k]
  } & {
    [k in keyof T['input']['body']]: T['input']['body'][k]
  }
  output: // apiClient will fill the undefined `error` or `data` fields with null to match the type
    | { data: T['returnValue']['data']; error: null }
    | { data: null; error: { message: string; code: string } }
}

/** Helper to parse query with zod schema */
export const parseHeaders =
  <T extends z.ZodSchema>(schema: T) =>
  (ctx: { headers: unknown }): z.infer<T> =>
    schema.parse(ctx.headers)

/** Helper to parse query with zod schema */
export const parseQuery =
  <T extends z.ZodSchema>(schema: T) =>
  (ctx: { query: unknown }): z.infer<T> =>
    schema.parse(ctx.query)

/** Helper to parse body with zod schema */
export const parseBody =
  <T extends z.ZodSchema>(schema: T) =>
  (ctx: { body: unknown }): z.infer<T> =>
    schema.parse(ctx.body)

/**
 * Helper to fetch a row from Supabase based on path param.
 * User must be authenticated.
 * @param pathParam
 * @param params
 * @returns
 */
export function getRowFromPath<
  T extends keyof Database['public']['Tables'],
  C extends string,
>(params: {
  table: T
  columns?: C
  /** If not provided, the first path param will be used. */
  pathParam?: string
  idColumn?: C
  subject: string
  /** Verify the `user_id` column is present and matches the user ID. */
  skipOwnershipCheck?: boolean
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (ctx: any) => {
    if (!ctx.parsed.auth) {
      throw new AppError('Not authenticated', {
        errorCode: 'UNAUTHENTICATED',
        httpStatus: 401,
      })
    }

    const supabase = ctx.parsed.auth.supabase as SupabaseClientDatabase
    const user = ctx.parsed.auth.user as AppUser
    const { table, columns, idColumn = 'id', skipOwnershipCheck } = params

    const pathParamValue = params.pathParam
      ? ctx.parsed.path.params[params.pathParam]
      : Object.entries(ctx.parsed.path.params)[0][1]

    // TODO: fix type and remove `as any`
    const row = skipOwnershipCheck
      ? await supabase
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .from(table as any)
          .select(columns)
          .eq(idColumn, pathParamValue)
          .maybeSingle()
      : await supabase
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .from(table as any)
          .select(columns)
          .eq(idColumn, pathParamValue)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .eq('user_id', user.id as any)
          .maybeSingle()

    unwrapData(row, params.subject)

    return { row: row.data }
  }
}
