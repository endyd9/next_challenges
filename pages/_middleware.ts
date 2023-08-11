import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.url.includes("/api")) {
    if (
      Boolean(req.cookies.logincookie) &&
      req.url.includes("/join") &&
      req.url.includes("/login")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      !req.cookies.logincookie &&
      !req.url.includes("/join") &&
      !req.url.includes("/login")
    ) {
      return NextResponse.redirect(new URL("/join", req.url));
    }
  }
}
