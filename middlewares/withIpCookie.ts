import { serialize } from 'cookie'
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server'
import { MiddlewareFactory } from './types'

/**
 * Sets the test_ip cookie to contain ip, country, region and city information.
 * @param req
 * @returns
 */
export const withIpCookie: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next)
    const { searchParams } = request.nextUrl

    if (searchParams.has('test_ip') && res && res instanceof NextResponse) {
      const testIp = searchParams.get('test_ip')
      try {
        const response = await fetch(`https://ipapi.co/${testIp}/json/`)
        const data = await response.json()
        const location = {
          ip: testIp,
          country: data.country_code,
          region: data.region,
          city: data.city
        }
        res.cookies.set('test_ip', JSON.stringify(location), {
          httpOnly: true
        })
        request.nextUrl.searchParams.delete('test_ip')
      } catch (e) {
        console.log('failed to set test_ip', e.message)
      }

      return res
    }

    return res
  }
}
