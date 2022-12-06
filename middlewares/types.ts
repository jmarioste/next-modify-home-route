import { NextMiddleware } from 'next/server'

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

export type ClientInfo = {
  ip: string
  city: string
  region: string
  country: string
}
