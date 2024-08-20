import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
// import { checkUser } from "./actions/user-actions";

export default auth(async (request, event) => {
  const url = request.nextUrl.clone();

  //kalau gak punya login
  if (!request.auth) {  
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  //punya login lakukan pengecekan user data
//   const data = await checkUser(request.auth.user.email);  
// console.log("data",data)


  return NextResponse.next();
});

export const config = {
  matcher: ["/user/:path*"],
};
