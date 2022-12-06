import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

import { MiddlewareFactory } from './types'

export const withSecurityHeaders: MiddlewareFactory = (
  next: NextMiddleware
) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)
    if (res) {
      res.headers.set('x-content-type-options', 'nosniff')
      res.headers.set('x-dns-prefetch-control', 'false')
      res.headers.set('x-download-options', 'noopen')
      res.headers.set('x-frame-options', 'SAMEORIGIN')
      res.headers.set('x-permitted-cross-domain-policies', 'none')
      res.headers.set('x-powered-by', 'none')
      res.headers.set('x-xss-protection', '1; mode=block')
      res.headers.set('referrer-policy', 'strict-origin-when-cross-origin')
      res.headers.set('strict-transport-security', 'max-age=31536000')

      const pathname = request.nextUrl.pathname

      const isAccountPage = pathname.startsWith('/account')
      const isProduction = process.env.APP_ENV === 'production'
      if (isAccountPage || !isProduction) {
        const val = 'noindex, nofollow, nosnippet, noarchive'
        res.headers.set('x-robots-tag', val)
      }
    }

    return res
  }
}
