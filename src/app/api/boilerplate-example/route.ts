import z from 'zod'
import { parseQuery, publicRoute, type RouteType } from '~/server/routes'

export type GetBoilerplateExample = RouteType<typeof GET.inferRouteType>

const querySchema = z.object({
  name: z.string(),
})

// Example for creating endpoint using route helper. Try with curl:
// curl 'localhost:3000/api/boilerplate-example?name=John'
export const GET = publicRoute
  .parse({
    path: '/api/boilerplate-example' as const,
    query: parseQuery(querySchema),
  })
  .handle(({ parsed }) => {
    return { data: `Hello ${parsed.query.name}!` }
  })
