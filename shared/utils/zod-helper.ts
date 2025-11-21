import type { ZodError } from 'zod'

export const zodErrorToObj = (error: ZodError): Record<string, string> =>
  error.issues.reduce((acc: Record<string, string>, err) => {
    const pathKey = err.path[0]
    if (typeof pathKey === 'string' || typeof pathKey === 'number') {
      acc[String(pathKey)] = err.message.toLowerCase()
    }
    return acc
  }, {})
