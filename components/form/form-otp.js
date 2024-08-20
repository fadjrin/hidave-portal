"use client";

import { useFormState } from "react-dom";

import { redirect } from "next/navigation";
import { processOtp } from "@/actions/auth-actions";

export default function FormOtp() {
  const [formState, formAction] = useFormState(processOtp, {
    status: false,
    errors: {},
  });

  if (formState.status) {
    redirect("/user/home");
  }

  return (
    <form role="form" action={formAction}>
      <div className="card-header text-center pt-4">
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
        <h4>OTP</h4>
        <span>
          The OTP code is received after successfully completing the user
          registration process and can be viewed in the registered email.
        </span>
      </div>
      <div className="card-body">
        <label>Your OTP</label>
        <input
          type="text"
          className="form-control"
          placeholder="Input OTP"
          aria-label="OTP"
          name="otp"
          id="otp"
        />
      </div>
      <div className="card-footer">
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6 text-end">
            <button
              type="submit"
              className="btn btn-sm btn-primary w-auto mb-0"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
