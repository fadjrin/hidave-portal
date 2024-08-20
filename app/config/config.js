const config = {
  appName: "Hi Dave",
  apiBaseUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
  environment: process.env.NODE_ENV || "development",
  logo: "/assets/images/png/logo.png",
  logoBlue: "/assets/images/png/logo-blue.png",
  backgroundImage: "/assets/images/png/bg.png",
  googleLogo: "/assets/images/png/google.png",
  dashboardSvg: "/assets/images/svg/icon_dashboard.svg",
  serviceSvg: "/assets/images/svg/icon_service.svg",
  billingSvg: "/assets/images/svg/icon_billing.svg",
  ticketSvg: "/assets/images/svg/icon_ticket.svg",
  notifPng: "/assets/images/png/icon-notif.png",
  computerSvg: "/assets/images/svg/icon_computer.svg",
  billSvg: "/assets/images/svg/icon_bill.svg",
  avatarPng: "/assets/images/png/avatar.png",
  profileSvg: "/assets/images/svg/icon_profile.svg",
};

export default config;
