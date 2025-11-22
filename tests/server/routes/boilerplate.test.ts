import { describe, expect, test } from 'bun:test'
import type { Result } from 'saas-maker'
import { GET } from '~/src/app/api/boilerplate-example/route'

describe('GET', () => {
  test('returns success message when query parameter is correct parameter', async () => {
    const response = await GET.invoke({
      path: '/api/boilerplate-example',
      query: { name: 'john' },
    })
    expect(response).toEqual({ data: 'Hello john!' })
  })

  test('returns error message when query parameter is incorrect', async () => {
    const response = await GET.invoke({ query: { wrong_field: 'john' } })
    expect(response).toEqual({
      error: {
        code: 'BAD_REQUEST',
        details: {
          name: 'invalid input: expected string, received undefined',
        },
        message: 'Error parsing `query`',
      },
    })
  })
})
