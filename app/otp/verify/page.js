import config from "@/app/config/config";
import OtpTemplate from "@/components/otp-pages/otp-template";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <OtpTemplate config={config}>
      <div className="card-header text-center pt-4 align-items-center">
        <h2>Account Verified</h2>
        <img
          className="mb-5"
          alt="main_logo"
          src={config.blueLogoSvg}
          width="128"
        />
        <div className="text-center mb-5">
          <img src={config.otpSuccessSvg} />
        </div>
        <p>Your account has been verified</p>
      </div>
      <div className="card-footer text-center">
        <Link href="/user/home" passHref>
          <button type="button" className="btn btn-sm btn-primary w-auto mb-0">
            Go To Dashboard
            <img className="ms-1" src={config.toDashboardSvg} width="12" />
          </button>
        </Link>
      </div>
    </OtpTemplate>
  );
}
