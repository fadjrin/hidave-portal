"use client";

import { createSession } from "@/actions/auth-actions";
import { HOME_ROUTE } from "@/app/config/constants";
import { signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ButtonGoogle({ config }) {
  const router = useRouter();

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      await createSession({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        initUser: false,
      });

      router.push(HOME_ROUTE);
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
