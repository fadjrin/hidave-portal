export default function AuthTemplate({ config, children }) {
  return (
    <>
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container-fluid p-0">
              <div className="row g-0 h-100">
                <div
                  className="col-lg-7 col-md-6 col-sm-12 d-flex align-items-center"
                  style={{
                    backgroundImage: `url('${config.backgroundImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                  }}
                >
                  <div className="mask opacity-6 w-100 h-100"></div>
                  <div className="position-relative p-5">
                    <img src={config.logo} width="256" />
                  </div>
                </div>

                <div className="col-lg-5 col-md-6 col-sm-12 d-flex align-items-center justify-content-center bg-white">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
