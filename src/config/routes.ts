const routes = {
  // auth
  home: "/",
  login: "/login",
  forgotPassword: "/forgotPassword",
  emailForgotPassword: "/emailForgotPassword",
  // dashboard
  dashboard: "/dashboard",
  // profile
  profile: "/profile",
  // device
  listDevice: "/device-list",
  addDevice: "/device-list/add-device",
  updateDevice: "/device-list/update-device",
  detailDevice: "/device-list/detail-device",
  //service
  listService: "/service-list",
  addService: "/service-list/add-service",
  updateService: "/service-list/update-service",
  detailService: "/service-list/detail-service",

  //number-ofder
  listNumber: "/number-list",
  addNumber: "/number-list/add-number",
  detailNumber: "/number-list/detail-number",

  //report
  report: "/report",

  //role
  listRole: "/settings/role-list",
  addRole: "/settings/role-list/role-add",
  updateRole: "/settings/role-list/role-update",

  //account
  listAccount: "/settings/account-list",
  addAccount: "/settings/account-list/account-add",
  updateAccount: "/settings/account-list/account-update",

  //userlog
  userLog: "/settings/user-log",
};

const config = {
  routes,
};
export default config;
