"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import AuthTemplate from "@/components/auth-template";
import config from "./config/config";
import ButtonGoogle from "@/components/button/button-google";
import { signinFirebase } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [formState, formAction] = useFormState(signinFirebase, {
    status: false,
    errors: {},
  });

  if (formState.status) {
    redirect("/user/home");
  }  

  return (
    <AuthTemplate config={config}>
      <div className="card card-plain w-60">
        <div className="card-header px-0 pb-0 text-start">
          <img className="mb-3" src={config.logoBlue} width="128" />
          <h4 className="font-weight-bolder">Login</h4>
          <p className="mb-0">Please login to your account</p>
        </div>

        <div className="card-body px-0">
          {formState.status != true &&
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

          <form role="form" action={formAction}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Input email"
                aria-label="Email"
                name="email"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Input Password"
                aria-label="Password"
                name="password"
                id="password"                
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-sm btn-primary w-100 mt-4 mb-0"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer  pt-0 px-lg-2 px-1">
          <p className="mb-4 text-sm mx-auto">
            Don't have an account?&nbsp;
            <Link
              href="/signup"
              className="text-primary text-gradient font-weight-bolder"
            >
              Create Account
            </Link>
          </p>

          <div className="d-flex align-items-center">
            <hr className="flex-grow-1 border" />
            <span className="mx-2">OR</span>
            <hr className="flex-grow-1 border" />
          </div>

          <div className="text-center">
            <ButtonGoogle config={config} />
          </div>
        </div>
      </div>
    </AuthTemplate>
  );
}
