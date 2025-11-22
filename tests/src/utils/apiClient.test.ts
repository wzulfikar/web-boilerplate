import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'bun:test'
import { createMsw } from 'saas-maker/test-utils'
import type { GetBoilerplateExample } from '~/src/app/api/boilerplate-example/route'
import { apiClient } from '~/src/utils/apiClient'

const msw = createMsw()

describe('apiClient', () => {
  msw.setupHooks({ beforeEach, beforeAll, afterAll })

  test('GET example route', async () => {
    const endpoint = 'http://localhost:3000/api/boilerplate-example'
    const mock = msw.mockEndpoint('get', endpoint, () => ({ ok: true }))

    const name = 'John'
    await apiClient<GetBoilerplateExample>('/api/boilerplate-example', {
      query: { name },
    })

    expect(mock.calls.length).toEqual(1)
    expect(mock.calls[0].request.url).toEqual(`${endpoint}?name=${name}`)
  })
})
