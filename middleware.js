import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth(async (request, event) => {
  const url = request.nextUrl.clone();

  //kalau gak punya login
  if (!request.auth) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/user/:path*", "/otp/:path*"],
};
