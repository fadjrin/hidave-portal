
import ButtonLogout from "@/components/button/button-logout";
import config from "../config/config";
import LinkNav from "@/components/link-nav";
import { auth } from "@/lib/auth";
import Link from "next/link";
import "../globals.css";
import "../custom.css";

export const metadata = {
  title: "Hi Dave",
  description: "Query your Data, Wherever they are.",
};

export default async function AuthRootLayout({ children, title, addButton }) {
  const session = await auth();

  if (!session) return <div>Not authenticated</div>;

  return (
    <>
      <body className="g-sidenav-show bg-gray-300">
        <aside
          className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
          id="sidenav-main"
        >
          <div className="sidenav-header">
            <i
              className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
              aria-hidden="true"
              id="iconSidenav"
            ></i>
            <Link href="/user/home" className="navbar-brand m-0">
              <img
                className="navbar-brand-img h-100"
                alt="main_logo"
                src={config.logoBlue}
                width="128"
              />
            </Link>
          </div>

          <div
            className="collapse navbar-collapse  w-auto "
            id="sidenav-collapse-main"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <LinkNav href="/user/home" icon={config.dashboardSvg}>
                  Dashboard
                </LinkNav>
              </li>
              <li className="nav-item">
                <LinkNav href="/user/service" icon={config.serviceSvg}>
                  Service
                </LinkNav>
              </li>
              <li className="nav-item">
                <LinkNav href="/user/billing" icon={config.billingSvg}>
                  Billing
                </LinkNav>
              </li>
              <li className="nav-item">
                <LinkNav href="/user/ticket" icon={config.ticketSvg}>
                  Ticket
                </LinkNav>
              </li>
            </ul>
          </div>
        </aside>
        <main className="main-content position-relative border-radius-lg ">
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
            id="navbarBlur"
            data-scroll="false"
          >
            <div className="container-fluid py-1 px-0">
              <h3 className="mb-0">{title}</h3>
              &nbsp;
              {addButton}
              <div
                className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                id="navbar"
              >
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                  <button className="btn bg-gradient-primary btn-sm mb-0">
                    Free Trial
                  </button>
                </div>
                <ul className="navbar-nav justify-content-end">
                  <li className="nav-item d-flex align-items-center">
                    <div className="dropdown custom-dropdown">
                      <a
                        href="#"
                        data-bs-toggle="dropdown"
                        className="dropdown-link"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img
                          className="h-100 ms-md-1"
                          alt="avatar"
                          src={config.notifPng}
                          width="28"
                        />
                        <span className="number">2</span>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right p-0"
                        aria-labelledby="dropdownMenuButtonNotif"
                      >
                        <div className="title-wrap">
                          <div className="row">
                            <div className="col-6">
                              <h4 className="mb-0 ms-3">Notifications</h4>
                            </div>
                            <div className="col-6 text-end justify-content-center">
                              <a
                                href="#"
                                className="small mx-auto text-primary font-weight-bold me-3"
                              >
                                Mark all as read
                              </a>
                            </div>
                          </div>
                        </div>
                        <ul className="custom-notifications">
                          <li>
                            <a className="d-block">
                              <div className="font-weight-bolder text-dark">
                                <img
                                  className="me-1"
                                  src={config.computerSvg}
                                />
                                Dave Service 1 Has Been{" "}
                                <span className="text-success">Active</span>
                              </div>
                              <p className="text-sm text-gray mb-0">
                                01 Jul 2024 14:32
                              </p>
                            </a>
                          </li>
                          <li className="unread">
                            <a className="d-block">
                              <div className="font-weight-bolder text-dark">
                                <img
                                  className="me-1"
                                  src={config.computerSvg}
                                />
                                Dave Service 1 in{" "}
                                <span className="text-success">
                                  Preparation
                                </span>
                              </div>
                              <p className="text-sm text-gray mb-0">
                                01 Jul 2024 14:32
                              </p>
                            </a>
                          </li>
                          <li className="unread">
                            <a className="d-block">
                              <div className="font-weight-bolder text-dark">
                                <img className="me-1" src={config.billSvg} />
                                Dave Service 1 Has Successfully{" "}
                                <span className="text-success">Paid</span>
                              </div>
                              <p className="text-sm text-gray mb-0">
                                01 Jul 2024 14:32
                              </p>
                            </a>
                          </li>
                          <li>
                            <a className="d-block">
                              <div className="font-weight-bolder text-dark">
                                <img className="me-1" src={config.billSvg} />
                                Dave Service 1{" "}
                                <span className="text-danger">Failed</span> to
                                Pay
                              </div>
                              <p className="text-sm text-gray mb-0">
                                01 Jul 2024 14:32
                              </p>
                            </a>
                          </li>
                          <li>
                            <a className="d-block">
                              <div className="font-weight-bolder text-dark">
                                <img className="me-1" src={config.billSvg} />
                                Dave Service 1{" "}
                                <span className="text-danger">Failed</span> to
                                Pay
                              </div>
                              <p className="text-sm text-gray mb-0">
                                01 Jul 2024 14:32
                              </p>
                            </a>
                          </li>
                          <li>
                            <a className="d-block">
                              <div className="font-weight-bolder text-dark">
                                <img className="me-1" src={config.billSvg} />
                                Dave Service 1{" "}
                                <span className="text-danger">Failed</span> to
                                Pay
                              </div>
                              <p className="text-sm text-gray mb-0">
                                01 Jul 2024 14:32
                              </p>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item ps-md-3 pn-0 d-flex align-items-center">
                    <div className="dropdown custom-dropdown-profile">
                      Hi, {session?.user?.name}
                      <ButtonLogout>
                        <img
                          className="h-100 ms-md-1"
                          alt="avatar"
                          src={
                            session?.user?.image != ""
                              ? session?.user?.image
                              : config.avatarPng
                          }
                          width="28"
                          aria-haspopup="true"
                          aria-expanded="false"
                        />
                      </ButtonLogout>
                      <div
                        className="dropdown-menu p-0"
                        aria-labelledby="dropdownMenuButtonProfile"
                      >
                        <ul className="custom-notifications">
                          <li>
                            <a className="d-block">
                              <img className="me-1" src={config.profileSvg} />
                              <span className="text-sm text-dark mb-0">
                                Profile{" "}
                              </span>
                            </a>
                          </li>
                        </ul>
                        <div className="text-center py-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-danger w-75 mb-0 mx-3"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container-fluid py-2">
            <div className="row">{children}</div>
          </div>
        </main>
      </body>
    </>
  );
}
