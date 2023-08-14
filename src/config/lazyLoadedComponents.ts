import React from "react";


export const Profile = React.lazy(() => import("./../view/Profile/index"));
export const Dashboard = React.lazy(() => import("./../view/Dashboard/index"));
export const EmailForgotPassword = React.lazy(
  () => import("./../view/Auth/EmailForgotPassword/EmailForgotPassword")
);
export const ForgotPassword = React.lazy(
  () => import("./../view/Auth/ForgotPassword/ForgotPassword")
);
