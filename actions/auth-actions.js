"use server";

import { signIn, signOut, auth } from "@/lib/auth";

import { initAdmin } from "@/lib/firebase";
import {
  isValidEmail,
  isValidNumber,
  isValidPassword,
} from "@/lib/general-function";

import { FieldValue } from "firebase-admin/firestore";

export async function signinFirebase(prevState, formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
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
  // const userName = formData.get("userName");
  const email = formData.get("email");
  // const phone = formData.get("phone");
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

  // if (userName.trim().length <= 0) {
  //   errors.userName = "User name is required.";
  // }

  // if (phone.trim().length <= 0) {
  //   errors.phone = "Phone is required.";
  // } else {
  //   if (!isValidNumber(phone.trim())) {
  //     errors.phone = "Phone must be digits.";
  //   }
  // }

  if (flexCheckDefault == null) {
    errors.flexCheckDefault =
      "I agree to the terms and service and privacy policy must be selected.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: false,
      errors: errors,
    };
  }

  const firebase = await initAdmin();
  const result = await firebase
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      // phoneNumber: `+62${phone}`,
      password: password,
      displayName:
        lastName.trim().length > 0 ? `${firstName} ${lastName}` : firstName,
      disabled: false,
    })
    .then(async (user) => {
      /*
      const refUser = firebase.firestore().collection("users");

      const param = {
        created_at: FieldValue.serverTimestamp(),
        email: email,
        generateOtp: true, //supaya kirim email verifikasi
        active: false,
        name:
          lastName.trim().length > 0 ? `${firstName} ${lastName}` : firstName,
        // phone: phone,
        // username: userName,
      };
      await refUser.doc(user.uid).set(param, { merge: true });
      */

      await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      return {
        status: true,
        errors: {},
        message: "User successfully registered",
      };
    })
    .catch((error) => {
      console.log("er", error);
      const errorCode = error.code;
      const errorMessage = error.message;

      return {
        status: false,
        errors: {
          email: errorMessage,
        },
      };
    });

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

  const firebase = await initAdmin();

  const refUser = firebase.firestore().collection("users");

  const docsUser = await refUser.where("email", "==", email).get();

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

  try {
    await refUser.doc(docUser.id).set(
      {
        otp: null,
        active: true,
        active_at: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

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
