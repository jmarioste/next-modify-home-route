import { stackMiddlewares } from 'middlewares/stackMiddlewares'
import { withAuthorization } from 'middlewares/withAuthorization'
import { withRedirect } from 'middlewares/withRedirect'
import { withRedirectToHomePage } from 'middlewares/withRedirectToHomePage'
import { withSecurityHeaders } from 'middlewares/withSecurityHeaders'
import { withGraphqlHeader } from 'middlewares/withGraphqlHeader'
import { withIpCookie } from 'middlewares/withIpCookie'

const middlewares = [
  withRedirect,
  withRedirectToHomePage,
  withSecurityHeaders,
  withGraphqlHeader,
  withIpCookie,
  withAuthorization
]

export default stackMiddlewares(middlewares)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)'
  ]
}
