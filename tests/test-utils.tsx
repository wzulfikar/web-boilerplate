import type { mock } from 'bun:test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type RenderOptions, render } from '@testing-library/react'
import { merge } from 'es-toolkit'
import type { ReactElement } from 'react'
import type { PartialDeep } from 'type-fest'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

// All the providers you need for tests can go here : Theme, Redux, etc.
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: Wrapper, ...options })

/**
 * Helper to mock the return value of a mocked function by deep merging
 * @param mocked
 * @param mergeParams
 */
export function mockReturnOnce<T extends ReturnType<typeof mock>>(
  mock: T,
  mergeParams: PartialDeep<ReturnType<T>, { recurseIntoArrays: true }>,
) {
  mock.mockReturnValueOnce(merge(mock.getMockImplementation()?.(), mergeParams))
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as render }
