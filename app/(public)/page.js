import Link from "next/link";
import { redirect } from "next/navigation";

import AuthTemplate from "@/components/auth-template";
import config from "../config/config";
import ButtonGoogle from "@/components/button/button-google";
import FormLogin from "@/components/form/form-login";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session) redirect("/user/home");

  return (
    <AuthTemplate config={config}>
      <div className="card card-plain w-60">
        <div className="card-header px-0 pb-0 text-start">
          <img className="mb-3" src={config.logoBlue} width="128" />
          <h4 className="font-weight-bolder">Login</h4>
          <p className="mb-0">Please login to your account</p>
        </div>

        <FormLogin />

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
