export async function reportClientError(e: unknown, ctx?: object) {
  console.log('client error:', e, ctx)
}
