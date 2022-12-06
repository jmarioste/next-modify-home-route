import { NextMiddleware, NextResponse } from 'next/server'
import { MiddlewareFactory } from './types'

/**
 * A utility to create middle ware functions like this middleware1(middleware2(middlware3)).
 * @returns
 */
export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware {
  const current = functions[index]
  if (current) {
    const next = stackMiddlewares(functions, index + 1)
    return current(next)
  }
  return () => NextResponse.next()
}
