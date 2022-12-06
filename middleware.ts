import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (pathname.startsWith("/index/index")) {
    return NextResponse.rewrite(new URL("/my-index", origin));
  }
  console.log("middleware", pathname, req.url);
  return NextResponse.next();
}
