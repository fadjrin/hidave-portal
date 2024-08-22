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
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     // console.log("account", account, profile);
  //     if (account.provider === "credentials") {
  //       console.log(account, profile);
  //     }
  //     if (account.provider === "google") {
  //       return profile.email_verified;
  //     }
  //     return true;
  //   },
  // },

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
          const user = await signInWithEmailAndPassword(
            getAuth(firebase_app),
            credentials.email,
            credentials.password
          );
          return user;
        } catch (error) {
          console.log("error11111", error);
          return null;
        }
      },
    }),
  ],
});
