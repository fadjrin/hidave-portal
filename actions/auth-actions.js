"use server";

import {
  doc,
  updateDoc,
  serverTimestamp,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  HOME_ROUTE,
  ROOT_ROUTE,
  SESSION_COOKIE_NAME,
} from "@/app/config/constants";

import { firebase_app, auth } from "@/lib/firebase-client";
import { isValidEmail, isValidPassword } from "@/lib/general-function";

export async function createSession(user, reRoute = false) {
  cookies().set(SESSION_COOKIE_NAME, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  if (reRoute) {
    redirect(HOME_ROUTE);
  }
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}

export async function signinFirebase(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  let errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.trim().length <= 0) {
    errors.password = "Password is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: false,
      errors: errors,
    };
  }

  try {
    const authEmail = await signInWithEmailAndPassword(auth, email, password);

    const db = getFirestore(firebase_app);
    const refUser = doc(db, "users", authEmail.user.uid);
    const docUser = await getDoc(refUser);

    if (!docUser.exists()) {
      return {
        status: false,
        errors: {
          email: "Login failed.",
        },
      };
    }

    await createSession({
      uid: authEmail.user.uid,
      displayName: authEmail.user.displayName,
      email: authEmail.user.email,
      emailVerified: authEmail.user.emailVerified,
      photoURL: docUser.data().photoURL,
      initUser: docUser.data().active != null ? !docUser.data().active : true,
    });

    return {
      status: true,
      errors: {},
      message: "User successfully logged in.",
    };
  } catch (error) {
    console.log("er", error);
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      status: false,
      errors: {
        email: "Login failed.",
      },
    };
  }
}

export async function signupFirebase(prevState, formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const cPassword = formData.get("cPassword");
  const flexCheckDefault = formData.get("flexCheckDefault");

  let errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else {
    if (!isValidPassword(password.trim())) {
      errors.password =
        "password which contain at least one numeric digit, one uppercase and one lowercase letter";
    }
  }

  if (password.trim() != cPassword.trim()) {
    errors.cPassword = "Password and confirm password must match.";
  }

  if (firstName.trim().length <= 0) {
    errors.firstName = "First name is required.";
  }

  if (flexCheckDefault == null) {
    errors.flexCheckDefault =
      "terms and service and privacy policy must be selected.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: false,
      errors: errors,
    };
  }

  const result = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      const user = result.user;

      await updateProfile(user, {
        displayName:
          lastName.trim().length > 0 ? `${firstName} ${lastName}` : firstName,
      });

      return {
        status: true,
        errors: {},
        message: "User successfully registered",
        uid: user.uid,
      };
    })
    .catch((error) => {
      console.log("error create user", error);
      let errorMessage = error.message;

      if (error.code == "auth/email-already-in-use") {
        errorMessage = "The user already exists.";
      }

      return {
        status: false,
        errors: {
          email: errorMessage,
        },
      };
    });

  if (result.status) {
    const db = getFirestore(firebase_app);
    const userRef = doc(db, "users", result.uid);

    await setDoc(
      userRef,
      {
        name:
          lastName.trim().length > 0 ? `${firstName} ${lastName}` : firstName,
      },
      { merge: true }
    );

    const authEmail = await signInWithEmailAndPassword(auth, email, password);

    await createSession({
      uid: result.uid,
      displayName:
        lastName.trim().length > 0 ? `${firstName} ${lastName}` : firstName,
      email: email,
      emailVerified: authEmail.user.emailVerified,
      photoURL: "",
      initUser: true,
    });
  }

  return result;
}

export async function processOtp(prevState, formData) {
  const otp = formData.get("otp");

  let errors = {};

  if (otp.trim().length <= 0) {
    errors.otp = "OTP is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: false,
      errors: errors,
    };
  }

  const sessionArray = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  const session = JSON.parse(sessionArray);

  const db = getFirestore(firebase_app);
  const refUser = doc(db, "users", session.uid);
  const docUser = await getDoc(refUser);

  if (!docUser.exists()) {
    return {
      status: false,
      errors: {
        otp: "User not found",
      },
    };
  }

  const active = docUser.data().active != null ? docUser.data().active : false;

  if (active) {
    await createSession({
      uid: session.uid,
      displayName: session.displayName,
      email: session.email,
      emailVerified: session.emailVerified,
      photoURL: session.photoURL,
      initUser: false,
    });

    return {
      status: true,
    };
  }

  if (docUser.data().otp != otp) {
    return {
      status: false,
      errors: {
        otp: "OTP does not match.",
      },
    };
  }

  const endOtp = docUser.data().end_otp != null ? docUser.data().end_otp : null;

  if (endOtp && endOtp.toMillis() <= Date.now()) {
    return {
      status: false,
      errors: {
        otp: "The OTP has expired. Please regenerate a new OTP.",
      },
    };
  }

  try {
    await updateDoc(refUser, {
      otp: null,
      active: true,
      active_at: serverTimestamp(),
    });

    await createSession({
      uid: session.uid,
      displayName: session.displayName,
      email: session.email,
      emailVerified: session.emailVerified,
      photoURL: session.photoURL,
      initUser: false,
    });

    return {
      status: true,
    };
  } catch (error) {
    console.error("err", error);
    return {
      status: false,
      errors: {
        otp: "Something went wrong.",
      },
    };
  }
}
