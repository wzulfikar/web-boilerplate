export async function reportServerError(e: unknown, ctx?: object) {
  console.log('server error:', e, ctx)
}
