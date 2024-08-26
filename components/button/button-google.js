"use client";

import { createSession } from "@/actions/auth-actions";
import { signInWithGoogle } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function ButtonGoogle({ config }) {
  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      await createSession(
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          initUser: false,
        },
        true
      );
    }
  };

  return (
    <button
      onClick={handleSignIn}
      type="button"
      name="action"
      value="google"
      className="btn btn-sm btn-outline-primary w-100 mt-4 mb-0"
    >
      Login with Google
      <img
        src={config.googleLogo}
        width="12"
        style={{
          marginLeft: "3px",
          display: "inline-block",
        }}
      />
    </button>
  );
}
