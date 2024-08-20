"use server";

import firebase_app from "@/lib/firebase-client";
import { isValidEmail } from "@/lib/general-function";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const validateAuthLogin = async (req) => {
  let msg = [];

  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    msg.push("Please enter a valid email address.");
  }

  if (!password || password == undefined || password.trim().length < 8) {
    msg.push("Password must be at least 8 characters long.");
  }

  return msg;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let msg = await validateAuthLogin(req);
      if (msg.length > 0) {
        res.status(400).json({ errors: msg });
      }

      const { email, password } = req.body;

      const auth = getAuth(firebase_app);

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const userRecord = userCredential.user;
          res
            .status(200)
            .json({ status: true, messages: "", data: userRecord });
        })
        .catch(async (error) => {
          console.log("error", error);
          res.status(401).json({ status: false, messages: "Login failed" });
        });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ status: false, messages: error });
    }
  } else {
    res.status(403).json({ status: false, messages: "Method not allowed" });
  }
}
