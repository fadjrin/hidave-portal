"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { processOtp } from "@/actions/auth-actions";
import { useState, useRef, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import firebase_app from "@/lib/firebase-client";
import { format, fromUnixTime } from "date-fns";

export default function FormOtp({ session, config }) {
  const { pending } = useFormStatus();
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (session.user.uid) {
      const db = getFirestore(firebase_app);
      const userRef = doc(db, "users", session.user.uid);

      const unsubscribe = onSnapshot(userRef, async (userDoc) => {
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User Data:", userData);

          const currentTime = new Date().getTime();
          const endTime =
            userData.end_otp != null ? userData.end_otp.toMillis() : null;
          const remainingTime = Math.max(0, endTime - currentTime);
          setCountdown(Math.floor(remainingTime / 1000));

          const localEndTime = fromUnixTime(endTime / 1000);
          console.log(format(localEndTime, "yyyy-MM-dd HH:mm:ss"));
        }
      });

      return () => unsubscribe();
    }
  }, [session.user.uid]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [formState, formAction] = useFormState(processOtp, {
    status: false,
    errors: {},
  });

  if (formState.status) {
    redirect("/otp/verify");
  }

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) {
      const newOtp = [...otp];

      if (value.length > 1) {
        value.split("").forEach((char, i) => {
          if (index + i < otp.length) {
            newOtp[index + i] = char;
          }
        });
        setOtp(newOtp);

        const nextIndex = Math.min(index + value.length, otp.length - 1);
        inputRefs.current[nextIndex].focus();
      } else {
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    joinOtpFunc();
  };

  const joinOtpFunc = () => {
    const finalOtp = otp.join("");
    console.log("finalOtp", finalOtp);

    const formData = new FormData();
    formData.append("otp", finalOtp);

    formAction(formData);
  };

  const handleResendOtp = async () => {
    const confirmResend = window.confirm(
      "Are you sure you want to resend the OTP?"
    );
    if (confirmResend) {
      const db = getFirestore(firebase_app);
      const userRef = doc(db, "users", session.user.uid);
      await updateDoc(userRef, { generateOtp: true });
      console.log("OTP has been resent and generateOtp updated to true.");
    }
  };

  return (
    <>
      <form role="form" onSubmit={handleSubmit}>
        <div className="card-header text-center pt-4">
          <h2>Verify Account</h2>
          {formState.status !== true &&
            Object.keys(formState.errors).length > 0 && (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">Warning !</h4>
                <ul>
                  {Object.keys(formState.errors).map((error) => (
                    <li key={error}>{formState.errors[error]}</li>
                  ))}
                </ul>
              </div>
            )}
          <img
            className="navbar-brand-img h-100"
            alt="main_logo"
            src={config.blueLogoSvg}
            width="128"
          />
          <p className="mt-4 mb-0 text-space-grotesk">
            A One-Time Password has been sent to
            <br />
            <strong>{session.user?.email}</strong>
          </p>
        </div>
        <div className="card-body text-space-grotesk">
          <span className="text-dark text-sm">
            Input OTP Code &nbsp;
            <strong>
              {Math.floor(countdown / 60)}:
              {(countdown % 60).toString().padStart(2, "0")}
            </strong>
          </span>
          <span
            className="text-primary text-sm font-weight-bold float-end"
            onClick={handleResendOtp}
            style={{ cursor: "pointer" }}
          >
            Resend OTP
          </span>
          <div className="box-otp justify-content-center text-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="form-control form-otp"
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pasteData = e.clipboardData.getData("text");
                  handleChange(index, pasteData);
                }}
              />
            ))}
          </div>
        </div>
        <div className="card-footer text-center">
          <button
            type="submit"
            className="btn btn-sm btn-primary w-auto mb-0"
            disabled={pending}
          >
            {pending ? "Submitting..." : "Verify"}
            <img className="ms-1" src={config.arrowRightSvg} width="8" />
          </button>
        </div>
      </form>
    </>
  );
}
