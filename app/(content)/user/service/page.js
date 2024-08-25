import config from "@/app/config/config";
import NullDataPage from "@/components/service-page/null-data";
import ServiceList from "@/components/service-page/service-list";
import { DUMMY_SERVICE } from "@/dummy/service";
import Image from "next/image";

export const metadata = {
  title: "Service",
  description: "Query your Data, Wherever they are.",
};

export default function ServicePage() {
  let data = DUMMY_SERVICE;
  let content = <NullDataPage config={config} />;
  let addButton = "";

  if (data.length > 0) {
    addButton = (
      <button type="button" className="btn btn-sm btn-primary mb-0 ">
        Create Your New Service
        <Image
          className="ms-1"
          src={config.arrowRightSvg}
          width={12}
          height={12}
          alt="Arrow Right"
        />
      </button>
    );
    content = (
      <>
        <div className="col-12 mt-4">
          <div className="w-25">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <Image
                    src={config.searchSvg}
                    alt="Search"
                    width={18}
                    height={18}
                  />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search service"
                aria-label="search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <ServiceList config={config} data={data} />
        </div>
      </>
    );
  }

  return (
    <div className="container-fluid py-2">
      <div className="row">{content}</div>
    </div>
  );
}
