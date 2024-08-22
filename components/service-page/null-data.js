export default function NullDataPage({ config }) {
  return (
    <div className="col-lg-12">
      <div className="card px-5 h-auto">
        <div className="card-body p1-5 text-center">
          <p className="text-gray font-weight-bold pt-3 mb-1">
            You don't have any service.
          </p>
          <button
            type="button"
            className="col-lg-3 col-md-6 col-sm-6 col-xs-6 btn btn-sm btn-primary"
          >
            Create Your New Service
            <img className="ms-3" src={config.arrowRightSvg} width="8" />
          </button>
        </div>
      </div>
    </div>
  );
}
