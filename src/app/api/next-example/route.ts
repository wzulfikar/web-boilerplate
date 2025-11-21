import { NextResponse } from 'next/server'

// Example of creating GET endpoint with vanilla Next.js
export const GET = () => {
  return NextResponse.json({ success: true, message: 'Hello world!' })
}
