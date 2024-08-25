"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import AuthTemplate from "@/components/auth-template";
import config from "../../config/config";
import { signupFirebase } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

export default function SignupPage() {
  const [formState, formAction] = useFormState(signupFirebase, {
    status: false,
    errors: {},
  });

  if (formState.status) {
    redirect("/otp");
  }

  return (
    <AuthTemplate config={config}>
      <div className="card card-plain w-60">
        <div className="card-header px-0 pb-0 text-start">
          <img className="mb-3" src={config.logoBlue} width="128" />
          <h4 className="font-weight-bolder">Create Account</h4>
          <p className="mb-0">
            Please fill in the form below to create your account
          </p>
        </div>

        <div className="card-body px-0">
          {/* {formState.status != true &&
            Object.keys(formState.errors).length > 0 && (
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">Warning !</h4>
                <ul>
                  {Object.keys(formState.errors).map((error) => (
                    <li key={error}>{formState.errors[error]}</li>
                  ))}
                </ul>
              </div>
            )} */}

          <form role="form" action={formAction}>
            <div className="mb-3">
              <div className="row">
                <div className="col-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    className={
                      formState.errors && formState.errors?.firstName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    placeholder="Input first name"
                    aria-label="First Name"
                    name="firstName"
                    id="firstName"
                  />
                  {formState.errors && formState.errors?.firstName && (
                    <div className="invalid-feedback">
                      {formState.errors.firstName}
                    </div>
                  )}
                </div>

                <div className="col-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Input last name"
                    aria-label="Last Name"
                    name="lastName"
                    id="lastName"
                  />
                </div>
              </div>
            </div>
            {/* <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Input username"
                aria-label="Username"
                name="userName"
                id="userName"
              />
            </div> */}
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className={
                  formState.errors && formState.errors?.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Input email"
                aria-label="Email"
                name="email"
                id="email"
              />
              {formState.errors && formState.errors?.email && (
                <div className="invalid-feedback">{formState.errors.email}</div>
              )}
            </div>
            {/* <div className="mb-3">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="Input phone"
                aria-label="Phone"
                name="phone"
                id="phone"
              />
            </div> */}
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className={
                  formState.errors && formState.errors?.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Input password"
                aria-label="Password"
                name="password"
                id="password"
              />
              {formState.errors && formState.errors?.password && (
                <div className="invalid-feedback">
                  {formState.errors.password}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className={
                  formState.errors && formState.errors?.cPassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Input confirm password"
                aria-label="Confirm Password"
                name="cPassword"
                id="cPassword"
              />
              {formState.errors && formState.errors?.cPassword && (
                <div className="invalid-feedback">
                  {formState.errors.cPassword}
                </div>
              )}
            </div>
            <div className="form-check form-check-info text-start">
              <input
                className="form-check-input"
                type="checkbox"
                value="true"
                id="flexCheckDefault"
                name="flexCheckDefault"
              />
              <label
                className={
                  formState.errors && formState.errors?.flexCheckDefault
                    ? "form-check-label is-invalid"
                    : "form-check-label"
                }
              >
                I agree the <a className="text-primary">term and service</a> and{" "}
                <a className="text-primary">privacy policy</a>
              </label>
              {formState.errors && formState.errors?.flexCheckDefault && (
                <div className="invalid-feedback">
                  {formState.errors.flexCheckDefault}
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-sm btn-primary w-100 mt-4 mb-0"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer  pt-0 px-lg-2 px-1">
          <p className="mb-4 text-sm mx-auto">
            Have an account?&nbsp;
            <Link
              href="/"
              className="text-primary text-gradient font-weight-bolder"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </AuthTemplate>
  );
}
