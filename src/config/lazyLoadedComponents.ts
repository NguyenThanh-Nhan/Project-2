import React from "react";

export const Profile = React.lazy(() => import("./../view/Profile/index"));
export const Dashboard = React.lazy(() => import("./../view/Dashboard/index"));
export const EmailForgotPassword = React.lazy(
  () => import("../view/Auth/EmailForgotPassword")
);
export const ForgotPassword = React.lazy(
  () => import("../view/Auth/ForgotPassword")
);

// device
export const ListDevice = React.lazy(
  () => import("./../view/Device/ListDevice")
);
export const DetailDevice = React.lazy(
  () => import("./../view/Device/DetailDevice")
);
export const updateDevice = React.lazy(
  () => import("./../view/Device/UpdateDevice")
);
export const AddDevice = React.lazy(() => import("./../view/Device/AddDevice"));

// service
export const ListService = React.lazy(
  () => import("./../view/Service/ListService")
);
export const AddService = React.lazy(
  () => import("./../view/Service/AddService")
);
export const UpdateService = React.lazy(
  () => import("./../view/Service/UpdateService")
);
export const DetailService = React.lazy(
  () => import("./../view/Service/DetailService")
);

//number
export const Number = React.lazy(
  () => import("./../view/NumberOrder/ListNumber")
);

export const AddNumber = React.lazy(
  () => import("./../view/NumberOrder/AddNumber")
);

export const DetailNumber = React.lazy(
  () => import("./../view/NumberOrder/DetailNumber")
);

//report
export const Report = React.lazy(() => import("./../view/Report"));

//role management
export const ListRole = React.lazy(() => import("./../view/Roles/ListRole"));
export const AddRole = React.lazy(() => import("./../view/Roles/AddRole"));
export const UpdateRole = React.lazy(
  () => import("./../view/Roles/UpdateRole")
);
// account management
export const ListAccount = React.lazy(
  () => import("./../view/Account/ListAccount")
);
export const AddAccount = React.lazy(
  () => import("./../view/Account/AddAccount")
);
export const UpdateAccount = React.lazy(
  () => import("./../view/Account/UpdateAccount")
);

//userlog
export const UserLog = React.lazy(() => import("./../view/UserLog/index"));
