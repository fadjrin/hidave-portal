"use client";

import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { signinFirebase } from "@/actions/auth-actions";
import toast from "react-hot-toast";

export default function FormLogin() {
  const [formState, formAction] = useFormState(signinFirebase, {
    status: false,
    errors: {},
  });

  if (formState.status) redirect("/user/home");

  if (formState.status != true && Object.keys(formState.errors).length > 0) {
    let content = (
      <ul>
        {Object.keys(formState.errors).map((error) => (
          <li key={error}>{formState.errors[error]}</li>
        ))}
      </ul>
    );
    toast.error(content);
  }

  return (
    <div className="card-body px-0">
      {/* {formState.status != true && Object.keys(formState.errors).length > 0 && (
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
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className={
              formState.errors && formState.errors?.password
                ? "form-control is-invalid"
                : "form-control"
            }
            placeholder="Input Password"
            aria-label="Password"
            name="password"
            id="password"
          />
          {formState.errors && formState.errors?.password && (
            <div className="invalid-feedback">{formState.errors.password}</div>
          )}
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
  );
}
