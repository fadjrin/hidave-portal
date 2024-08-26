import config from "@/app/config/config";
import { SESSION_COOKIE_NAME } from "@/app/config/constants";
import FormOtp from "@/components/form/form-otp";
import OtpTemplate from "@/components/otp-pages/otp-template";
import { cookies } from "next/headers";

export const metadata = {
  title: "Verify Account",
  description: "Query your Data, Wherever they are.",
};

export default async function OtpPage() {
  const sessionArray = cookies().get(SESSION_COOKIE_NAME)?.value || null;

  const session = {
    user: JSON.parse(sessionArray),
  };

  return (
    <OtpTemplate config={config}>
      <FormOtp session={session} config={config} />
    </OtpTemplate>
  );
}
