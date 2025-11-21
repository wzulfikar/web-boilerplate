'use client'

import { useIsRestoring } from '@tanstack/react-query'
import { memo } from 'react'

/**
 * Raw WithState component without memoization. Use this if the child component
 * has complex logic that needs to be re-evaluated on every render.
 * @param param0
 * @returns
 */
export const WithStateNoMemo = <
  T,
  E extends { message: string } | null | undefined,
>({
  state = {},
  loading,
  error,
  empty,
  setup,
  children,
}: {
  state?: {
    isLoading?: boolean
    isError?: boolean
    isEmpty?: boolean
    data?: T
    error?: E
  }
  /** Loading component to render when `isLoading` is `true` */
  loading?: React.ReactNode
  /** Error component to render when `isError` is `true` */
  error?: React.ReactNode
  /** Empty component to render when `isEmpty` is `true` */
  empty?: React.ReactNode
  /** Setup component to render when the actual component needs initial set up from the user. */
  setup?: React.ReactNode | null
  /** The actual component to render when `isLoading`, `isError` and `isEmpty` are `false` */
  children: React.ReactNode | ((data: T) => React.ReactNode)
}) => {
  const isRestoring = useIsRestoring()
  const { isLoading, isError, isEmpty, data } = state

  if (setup) return setup

  // Using `isRestoring` to ensure the condition is executed after React Query is hydrated.
  // This prevent hydration mismatch by because it'll return the same loading component in server and in initial render.
  if (isRestoring || isLoading) return loading || null
  if (isError) {
    console.error('[WithState] Error received:', state.error)
    return error || null
  }
  if (
    isEmpty === true ||
    data === null ||
    (Array.isArray(data) && !data.length) ||
    (typeof data === 'object' && Object.keys(data).length === 0)
  )
    return empty ?? null

  return typeof children === 'function' ? children(data as T) : children
}

/**
 * Render a component based on the conditional state (eg. for async data):
 *
 * `loading` → `error` → `emptyState` → `component`
 *
 * Example:
 * ```tsx
 * <WithState
 *   state={query}
 *   loading={<Skeleton className="h-4 w-24 mt-1" />}
 *   error={<p>Error</p>}
 *   empty={<p>No data</p>}
 * >
 *   {(data) => <p>{data}</p>}
 * </WithState>
 * ```
 *
 * Use this when ternary operator becomes complex. It uses React Query's `useIsRestoring` under the hood
 * to make sure the children are rendered after React Query is hydrated.
 */
export const WithState = memo(WithStateNoMemo, (prev, next) => {
  return (
    !!prev.state &&
    !!next.state &&
    prev.state.isLoading === next.state.isLoading &&
    prev.state.isError === next.state.isError &&
    prev.state.isEmpty === next.state.isEmpty &&
    // Reference comparison is enough because most often the data is from React Query which is already memoized.
    prev.state.data === next.state.data
  )
}) as typeof WithStateNoMemo
