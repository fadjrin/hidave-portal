export default function ServiceList({ config, data }) {
  return (
    <>
      {data.map((item) => {
        let rightButton = "";
        let leftButton = "";
        let classText = "";
        let shareButton = "";
        let classButton = "col-4 text-end";
        let dot = config.dotBarDarkSvg;

        switch (item.status) {
          case "free_trial":
            dot = config.dotBarSuccessSvg;
            classText =
              "badge outline-primary text-small text-primary border-radius-xl ms-2";
            rightButton = (
              <>
                <button type="button" className="btn btn-sm btn-primary mb-0">
                  Open
                </button>
                <img
                  className="ms-3"
                  src={config.arrowRightNormalSvg}
                  width="8"
                />
              </>
            );
            break;

          case "preparing_process":
            classText =
              "badge outline-success text-small text-success border-radius-xl ms-2";
            rightButton = (
              <>
                <div className="row align-items-center">
                  <div className="col-10">
                    <div className="progress progress-md">
                      <div
                        className="progress-bar bg-gradient-primary"
                        role="progressbar"
                        style={{
                          width: item.preparing_percentage + "%",
                        }}
                        aria-valuenow={item.preparing_percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                  <div className="col-2 px-0">
                    <span className="font-weight-bolder text-dark text-xs">
                      {item.preparing_percentage}%
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray font-weight-bold">
                    Preparing....
                  </span>
                </div>
              </>
            );

            classButton = "col-4";
            break;

          case "waiting_payment":
            classText =
              "badge outline-danger text-small text-danger border-radius-xl ms-2";
            rightButton = (
              <button type="button" className="btn btn-sm btn-primary mb-0">
                Pay
              </button>
            );
            break;

          case "need_extend":
            dot = config.dotBarSuccessSvg;
            classText =
              "badge outline-warning text-small text-warning border-radius-xl ms-2";

            leftButton = (
              <button
                type="button"
                className="btn btn-sm btn-outline-primary mb-0"
              >
                Extend
              </button>
            );
            rightButton = (
              <>
                <button type="button" className="btn btn-sm btn-primary mb-0">
                  Open
                </button>
                <img
                  className="ms-3"
                  src={config.arrowRightNormalSvg}
                  width="8"
                />
              </>
            );
            break;

          case "active":
            dot = config.dotBarSuccessSvg;
            rightButton = (
              <>
                <button type="button" className="btn btn-sm btn-primary mb-0">
                  Open
                </button>
                <img
                  className="ms-3"
                  src={config.arrowRightNormalSvg}
                  width="8"
                />
              </>
            );
            break;

          case "stopped":
            shareButton = (
              <img className="ms-1" src={config.shareSvg} width="12" />
            );
            classText =
              "badge outline-dark text-small text-dark border-radius-xl ms-2";
            leftButton = (
              <button
                type="button"
                className="btn btn-sm btn-outline-primary mb-0"
              >
                Extend
              </button>
            );
            rightButton = (
              <>
                <button type="button" className="btn btn-sm btn-dark mb-0">
                  Open
                </button>
                <img
                  className="ms-3"
                  src={config.arrowRightNormalSvg}
                  width="8"
                />
              </>
            );
            break;
        }
        return (
          <div key={item.id} className="card mb-2">
            <div className="card-body pb-0">
              <div className="row justify-content-center">
                <div className="col-4">
                  <div className="d-flex mb-1">
                    <img className="me-1" src={dot} width="8" />
                    
                    <h6 className="mb-0">{item.name}</h6>
                    {shareButton}
                    <span className={classText}>{item.text}</span>
                  </div>
                  <p className="text-xs text-gray font-weight-bold">
                    {item.service_plan} Until {item.until}
                  </p>
                </div>
                <div className="col-4">
                  <div className="text-start">
                    <p className="text-xs text-gray font-weight-bold mb-0">
                      Service
                    </p>
                    <h6 className="text-sm mb-0">{item.content}</h6>
                  </div>
                </div>
                <div className={classButton}>
                  {leftButton}
                  &nbsp;
                  {rightButton}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
