import { NextRequest, NextResponse } from 'next/server'

type HandlerFn = (req: NextRequest) => Promise<any>
const PUBLIC_FILE = /\.(.*)$/
/**
 * For non-production environments, Redirect to password-protect page if `jomi-pw-protect` cookie is not set.
 *
 */

const excludeOrigins = ['localhost', 'vercel']
export default function withPasswordProtection(handler: HandlerFn) {
  return async function (req: NextRequest) {
    const { pathname, search, origin } = req.nextUrl

    //no password if production.
    if (
      process.env.APP_ENV === 'production' ||
      excludeOrigins.some((excluded) => origin.includes(excluded))
    ) {
      return handler(req)
    }

    if (req.cookies['jomi-pw-protect']) {
      return handler(req)
    }

    if (
      pathname === '/password-protect' ||
      pathname.startsWith('/api') ||
      PUBLIC_FILE.test(pathname)
    ) {
      return handler(req)
    }

    return NextResponse.redirect(
      `${origin}/password-protect?redirectUrl=${encodeURIComponent(
        pathname + search
      )}`
    )
  }
}
