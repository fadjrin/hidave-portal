import config from "@/app/config/config";
import FormOtp from "@/components/form/form-otp";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OtpPage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <section>
      <div className="page-header min-vh-100">
        <div className="container-fluid p-0">
          <div className="row g-0 h-100">
            <div
              className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-center"
              style={{
                backgroundImage: `url('${config.backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
              }}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-7 col-lg-7 col-md-7 mx-auto">
                    <div id="page1" className="onboarding-page">
                      <div className="card z-index-0">
                        <FormOtp />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
