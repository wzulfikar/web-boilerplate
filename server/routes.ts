import { waitUntil } from '@vercel/functions'
import { getErrorInfo, throwIfNull } from 'saas-maker'
import {
  createRoute,
  type ErrorHandlerPayload,
  json,
  reportServerError,
} from 'saas-maker/server'
import type { ZodError } from 'zod'
import { zodErrorToObj } from '~/shared/utils/zod-helper'
import { getUser } from './lib/auth/getUser'

// Re-export route helpers for convenience
export * from './lib/route-helper'

const baseRoute = createRoute({
  name: 'baseRoute',
  onError: globalErrorHandler,
})

export const publicRoute = baseRoute.extend({ name: 'publicRoute' })

export const userRoute = baseRoute.extend({ name: 'userRoute' }).parse({
  auth: async () => {
    const user = await getUser()
    throwIfNull(user, 'Not authenticated', {
      errorCode: 'ERROR_NOT_AUTHENTICATED',
      httpStatus: 401,
    })
    return { user }
  },
})

async function globalErrorHandler(ctx: ErrorHandlerPayload) {
  const errorInfo = getErrorInfo(ctx.error.cause) || getErrorInfo(ctx.error)
  const errorCode = errorInfo?.code || 'INTERNAL_SERVER_ERROR'
  const routeName = ctx.error.routeInfo?.name

  // Return early without reporting if it's parsing error
  if (ctx.error.name === 'RouteError' && ctx.error.cause?.name === 'ZodError') {
    const code = 'BAD_REQUEST'
    const msg = ctx.error.message
    const details = zodErrorToObj(ctx.error.cause as ZodError)
    console.warn(`[warn] [${code}] ${msg}: ${JSON.stringify(details)}`)
    return json({ error: { code, message: msg, details } }, { status: 400 })
  }

  console.error(
    `[error] [${errorCode}] error when executing route '${routeName}': ${ctx.error}`,
  )
  console.log(
    '[error] route steps:',
    ctx.error.routeInfo?.steps || '(no steps)',
  )
  console.log('[error] cause:', ctx.error.cause || '(cause not set)')

  const reportErrorPromise = getUser()
    .then((user) => {
      return reportServerError(ctx.error, {
        ctx: routeName,
        userId: user?.id,
      })
    })
    .catch((error) => {
      console.error(`[error] error when reporting error: ${error}`)
    })

  // Don't block response but make sure the error is reported
  waitUntil(reportErrorPromise)

  if (errorInfo) {
    const { code, message, httpStatus = 500 } = errorInfo
    return json({ error: { code, message } }, { status: httpStatus })
  }

  // Default error response
  return json(
    { error: { code: errorCode, message: 'Internal server error' } },
    { status: 500 },
  )
}
