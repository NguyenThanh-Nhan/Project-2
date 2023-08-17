import React from "react";

export const Profile = React.lazy(() => import("./../view/Profile/index"));
export const Dashboard = React.lazy(() => import("./../view/Dashboard/index"));
export const EmailForgotPassword = React.lazy(
  () => import("./../view/Auth/EmailForgotPassword/EmailForgotPassword")
);
export const ForgotPassword = React.lazy(
  () => import("./../view/Auth/ForgotPassword/ForgotPassword")
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
