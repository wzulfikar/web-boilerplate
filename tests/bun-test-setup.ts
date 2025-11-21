import { afterEach, mock } from 'bun:test'
import { cleanup } from '@testing-library/react'

process.env.SUPABASE_SERVICE_KEY = 'service-key'

// Mock `.env.server`.
// Otherwise there'll be error about accessing server env in client code.
mock.module('~/env.server', () => ({
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'some-key',
  },
}))

afterEach(() => {
  cleanup()
})
