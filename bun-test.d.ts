// This file must be present in the root of the project. Moving it to eg.
// `./tests/bun-test.d.ts` will break the type check for tests.

import '@testing-library/jest-dom'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'bun:test' {
  interface Matchers<R = void>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
