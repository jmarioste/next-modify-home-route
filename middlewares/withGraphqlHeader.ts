import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
  userAgent
} from 'next/server'

import { MiddlewareFactory } from './types'

/**
 * Rewrites the /graphql requests that comes from the browser
 * @param next
 * @returns
 */
export const withGraphqlHeader: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)
    const { pathname } = request.nextUrl
    const isMatch = pathname === '/graphql' && res instanceof NextResponse
    if (isMatch) {
      const headers = new Headers(request.headers)
      const testLocation = request.cookies.get('test_ip')

      if (testLocation?.value) {
        try {
          const val = JSON.parse(testLocation.value) as any
          request.geo.country = val.country
          request.geo.region = val.region
          request.geo.city = val.city
          headers.set('x-client-ip', val.ip ?? '')
        } catch (error) {
          console.log(`ERROR withGraphqlHeader: ${error.message}`)
        }
      } else {
        headers.set('x-client-ip', request.ip ?? '')
      }

      console.log('geo', request.geo)
      headers.set('x-country', request.geo.country ?? '')
      headers.set('x-region', request.geo.region ?? '')
      headers.set('x-city', request.geo.city ?? '')

      return NextResponse.rewrite(`${process.env.API_URL}/graphql`, {
        request: {
          headers
        }
      })
    }

    return res
  }
}
