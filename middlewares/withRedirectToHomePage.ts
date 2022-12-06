import { getToken } from 'next-auth/jwt'
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server'

import { MiddlewareFactory } from './types'

export const withRedirectToHomePage: MiddlewareFactory = (
  next: NextMiddleware
) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)
    const pathname = request.nextUrl.pathname

    const isLoginOrSignUp = ['/login', '/signup'].some((path) =>
      pathname.startsWith(path)
    )

    if (isLoginOrSignUp) {
      const token = await getToken({
        req: request,
        secret: process.env.SECRET
      })

      if (token) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    return res
  }
}
