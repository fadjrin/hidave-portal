"use server";

import { signIn, signOut, auth } from "@/lib/auth";

import firebase_app from "@/lib/firebase-client";
import {
  isValidEmail,
  isValidNumber,
  isValidPassword,
} from "@/lib/general-function";

import {
  doc,
  updateDoc,
  serverTimestamp,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";

import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return {
      status: true,
      errors: {},
      message: "User successfully logged in.",
    };
  } catch (error) {
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

  const auth = getAuth(firebase_app);

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
      const errorMessage = error.message;

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

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  }

  return result;
}

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/user/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
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

  const dataAuth = await auth();

  const email = dataAuth.user.email;

  // const firebase = await initAdmin();

  // const refUser = firebase.firestore().collection("users");

  // const docsUser = await refUser.where("email", "==", email).get();
  const db = getFirestore(firebase_app);
  const refUser = collection(db, "users");

  const q = query(refUser, where("email", "==", email));
  const docsUser = await getDocs(q);

  if (docsUser.docs.length <= 0) {
    return {
      status: false,
      errors: {
        otp: "User not found",
      },
    };
  }

  const docUser = docsUser.docs[0];

  const active = docUser.data().active != null ? docUser.data().active : false;

  if (active) {
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
    // await refUser.doc(docUser.id).set(
    //   {
    //     otp: null,
    //     active: true,
    //     active_at: serverTimestamp(),
    //   },
    //   { merge: true }
    // );
    await updateDoc(doc(refUser, docUser.id), {
      otp: null,
      active: true,
      active_at: serverTimestamp(),
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
