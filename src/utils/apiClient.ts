import ky from 'ky'
import { AppError } from 'saas-maker'
import { env } from '~/env.client'
import type { RouteType } from '~/server/routes'

export const createApiClient = (params: {
  prefixUrl: string
  timeout?: number
  fetch?: typeof fetch
}) => {
  const kyInstance = ky.create({
    prefixUrl: params.prefixUrl,
    timeout: params.timeout,
    fetch: params?.fetch,
    throwHttpErrors: false,
  })

  async function apiCall<
    T extends RouteType<{
      path: `${string}`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      returnValue: any
    }>,
  >(
    path: T['path'],
    params: {
      json?: T['input']
      query?: T['input']
      method?: 'get' | 'post' | 'put' | 'delete'
      headers?: Record<string, string>
      throwOnError: true
    },
  ): Promise<NonNullable<T['output']['data']>>

  async function apiCall<
    T extends RouteType<{
      path: `${string}`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      returnValue: any
    }>,
  >(
    path: T['path'],
    params?: {
      json?: T['input']
      query?: T['input']
      method?: 'get' | 'post' | 'put' | 'delete'
      headers?: Record<string, string>
      throwOnError?: false
    },
  ): Promise<T['output']>

  async function apiCall<
    T extends RouteType<{
      path: `${string}`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      returnValue: any
    }>,
  >(
    path: T['path'],
    params?: {
      json?: T['input']
      query?: T['input']
      method?: 'get' | 'post' | 'put' | 'delete'
      headers?: Record<string, string>
      throwOnError?: boolean
    },
  ): Promise<NonNullable<T['output']['data']> | T['output']> {
    const method = params?.method ?? (params?.json ? 'post' : 'get')

    const response = await kyInstance[method]<T['output']>(
      path.replace(/^\//, ''), // Remove leading slash as required by ky
      {
        searchParams: params?.query ?? {},
        json: params?.json,
        headers: params?.headers,
      },
    )

    const result = await response.json()

    // Fill undefined `data` and `error` with null to match result container type from `RouteType`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!('data' in result)) (result as any).data = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!('error' in result)) (result as any).error = null

    if (params?.throwOnError) {
      if (result.error) {
        const { code, message } = result.error
        // Forward error from server to client
        throw new AppError(message, { errorCode: code })
      }
      return result.data as NonNullable<T['output']['data']>
    }

    return result
  }

  return apiCall
}

/**
 * Call internal API endpoint. Uses `GET` method by default.
 * If `json` is provided, uses `POST` method. Pass the `method` param to
 * override the default method. Returns JSON response.
 */
export const apiClient = createApiClient({
  prefixUrl: env.NEXT_PUBLIC_BASE_URL,
})
