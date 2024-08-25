export default function OtpTemplate({ children, config }) {
  return (
    <main className="main-content mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container-fluid p-0">
            <div className="row g-0 h-100">
              <div
                className="col-lg-12 col-md-12 col-sm-12 d-flex align-items-center"
                style={{
                  backgroundImage: `url('${config.onBoardingPng}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "100vh",
                }}
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-7 col-md-7 mx-auto">
                      <div className="onboarding-page">
                        <div className="card z-index-0">{children}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
