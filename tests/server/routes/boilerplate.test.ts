import { describe, expect, test } from 'bun:test'
import { GET } from '~/src/app/api/boilerplate-example/route'

describe('GET', () => {
  test('returns success message when query parameter is correct parameter', async () => {
    const response = await GET.invoke({ query: { name: 'john' } })
    expect(response).toEqual({ success: true, message: 'Hello john!' })
  })

  test('returns error message when query parameter is incorrect', async () => {
    const response = await GET.invoke({ query: { named: 'john' } })
    // TODO: fix in saas-maker: .invoke should return json for error or successful flow
    const error = await (response as unknown as Response).json()
    expect(error).toEqual({
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
