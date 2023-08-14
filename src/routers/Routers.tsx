
import config from "../config";
import {
  EmailForgotPassword,
  ForgotPassword,
} from "../config/lazyLoadedComponents";
import MainLayout from "../layout/LayoutFirst";
import LayoutSecond from "../layout/LayoutSecond";
import Login from "../view/Auth/Login/Login";
import Dashboard from "../view/Dashboard";
import Profile from "../view/Profile";
import RootPage from "../view/RootPage";

export const routes = [
  { path: config.routes.home, component: RootPage, layout: null },
  { path: config.routes.login, component: Login, layout: null },
  {
    path: config.routes.emailForgotPassword,
    component: EmailForgotPassword,
    layout: null,
  },
  {
    path: config.routes.forgotPassword,
    component: ForgotPassword,
    layout: null,
  },
  {
    path: config.routes.dashboard,
    component: Dashboard,
    layout: LayoutSecond,
  },
  {
    path: config.routes.profile,
    component: Profile,
    layout: MainLayout,
  },
];
