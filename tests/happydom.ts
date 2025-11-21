import { afterEach, expect } from 'bun:test'
import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { QueryCache } from '@tanstack/react-query'
import * as matchers from '@testing-library/jest-dom/matchers'

// NOTE: Disable msw to avoid `SyntaxError: Export named 'HTTPParser' not found in module 'http'`
// import { server } from '~/src/mocks/server'

GlobalRegistrator.register()
expect.extend(matchers)
location.href = 'http://localhost'

const queryCache = new QueryCache()
// Establish API mocking before all tests.

// NOTE: Disable msw to avoid `SyntaxError: Export named 'HTTPParser' not found in module 'http'`
// beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  // NOTE: Disable msw to avoid `SyntaxError: Export named 'HTTPParser' not found in module 'http'`
  // server.resetHandlers()
  queryCache.clear()
})

// Clean up after the tests are finished.
// NOTE: Disable msw to avoid `SyntaxError: Export named 'HTTPParser' not found in module 'http'`
// afterAll(() => server.close())
