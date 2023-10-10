import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_FILE = /\.(.*)$/

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.startsWith("/pokemons") ||
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next()
  return NextResponse.redirect(new URL("/", request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path+",
}
