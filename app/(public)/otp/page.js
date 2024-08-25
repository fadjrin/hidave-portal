import config from "@/app/config/config";
import FormOtp from "@/components/form/form-otp";
import OtpTemplate from "@/components/otp-pages/otp-template";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Verify Account",
  description: "Query your Data, Wherever they are.",
};

export default async function OtpPage() {
  const session = await auth();

  return (
    <OtpTemplate config={config}>
      <FormOtp session={session} config={config} />
    </OtpTemplate>
  );
}
