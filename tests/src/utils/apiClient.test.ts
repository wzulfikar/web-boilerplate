import { describe, expect, test } from 'bun:test'
import type { GetBoilerplateExample } from '~/src/app/api/boilerplate-example/route'
import { apiClient } from '~/src/utils/apiClient'

describe('apiClient', () => {
  test('GET example route', async () => {
    const name = 'John'
    const result = await apiClient<GetBoilerplateExample>(
      '/api/boilerplate-example',
      { query: { name } },
    )
    expect(result).toEqual({ data: `Hello ${name}!`, error: null })
  })
})
