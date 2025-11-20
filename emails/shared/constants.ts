import { env } from '~/env.server'

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? env.PRODUCTION_URL
    : 'http://localhost:3001'
