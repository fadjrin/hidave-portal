import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "./app/config/constants";

export function middleware(request) {
  const url = request.nextUrl.clone();

  const sessionArray = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  if (!sessionArray) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  console.log("sessionArray", sessionArray);

  console.log("request.nextUrl.pathname", request.nextUrl.pathname);

  if (!request.nextUrl.pathname.startsWith("/otp")) {
    const session = JSON.parse(sessionArray);
    if (session.initUser) {
      url.pathname = "/otp";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/otp/:path*"],
};
