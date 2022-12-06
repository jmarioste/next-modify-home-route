import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse
} from 'next/server'
import { MiddlewareFactory } from './types'

//use this function to query redirect since we can't use apollo client in here
async function getRedirect(from: string) {
  const response = await fetch(process.env.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      //RedirectDocument
      query: `query Redirect($from: String!) {
        redirectFor(from: $from) {
          from
          to
          type
        }
      }`,
      variables: {
        from
      }
    })
  })

  const data = await response.json()
  return data
}
const PUBLIC_FILE = /\.(.*)$/

/**
 * Middleware function to redirect based on the redirects stored in the database
 *
 */
export const withRedirect: MiddlewareFactory = (next: NextMiddleware) => {
  return async function (req: NextRequest, _next: NextFetchEvent) {
    try {
      const { pathname, origin } = req.nextUrl
      //
      if (pathname === '/') {
        return NextResponse.rewrite(new URL('/home', origin))
      }

      if (pathname === 'index') {
        return NextResponse.rewrite(new URL('/article-index', origin))
      }

      if (
        pathname === '/' ||
        pathname === '/index' ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/graphql') ||
        pathname === '/access' ||
        pathname.startsWith('/cms') ||
        (PUBLIC_FILE.test(pathname) && !pathname.startsWith('/article'))
      ) {
        return next(req, _next)
      }

      const { data } = await getRedirect(pathname)

      if (data?.redirectFor) {
        const redirect = data.redirectFor
        const url = new URL(redirect.to, origin)
        return NextResponse.redirect(url, +redirect.type)
      }

      return next(req, _next)
    } catch (e) {
      console.error('with Redirect')
      console.error(e.message) //wont be able to use logger here
    }
  }
}
