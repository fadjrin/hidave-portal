import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase_app from "./firebase-client";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl;

    //   console.log("pathname", pathname);
    //   if (pathname === "/middleware-example") return !!auth;
    //   return true;
    // },
    async session({ session, token }) {
      session.user.uid = token.sub;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        if (credentials === null) return null;

        try {
          const data = await signInWithEmailAndPassword(
            getAuth(firebase_app),
            credentials.email,
            credentials.password
          );
          const user = data.user;
          return {
            id: user.uid,
            email: user.email,
            name: user.displayName,
          };
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
});
