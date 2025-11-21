import z from 'zod'
import { parseQuery, publicRoute } from '~/server/routes'

const querySchema = z.object({
  name: z.string(),
})

// Example for creating endpoint using route helper. Try with curl:
// curl 'localhost:3000/api/boilerplate-example?name=John'
export const GET = publicRoute
  .parse({
    query: parseQuery(querySchema),
  })
  .handle(({ parsed }) => {
    return { success: true, message: `Hello ${parsed.query.name}!` }
  })
