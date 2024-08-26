"use client";

import { useEffect, useState } from "react";

import { onAuthStateChanged } from "@/lib/auth";

export default function useUserSession(InitSession) {
  const [userUid, setUserUid] = useState(InitSession);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      console.log("authUser",authUser)
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
