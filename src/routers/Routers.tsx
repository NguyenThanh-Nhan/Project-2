import {
  AddDevice,
  AddNumber,
  AddService,
  DetailDevice,
  DetailNumber,
  DetailService,
  EmailForgotPassword,
  ForgotPassword,
  ListDevice,
  ListService,
  Number,
  UpdateService,
  updateDevice,
} from "../config/lazyLoadedComponents";
import config from "../config/routes";
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
  //device
  {
    path: config.routes.listDevice,
    component: ListDevice,
    layout: MainLayout,
  },
  {
    path: config.routes.addDevice,
    component: AddDevice,
    layout: MainLayout,
  },
  {
    path: config.routes.updateDevice,
    component: updateDevice,
    layout: MainLayout,
  },
  {
    path: config.routes.detailDevice,
    component: DetailDevice,
    layout: MainLayout,
  },
  //service
  {
    path: config.routes.listService,
    component: ListService,
    layout: MainLayout,
  },
  {
    path: config.routes.detailService,
    component: DetailService,
    layout: MainLayout,
  },
  {
    path: config.routes.addService,
    component: AddService,
    layout: MainLayout,
  },
  {
    path: config.routes.updateService,
    component: UpdateService,
    layout: MainLayout,
  },

  //number-order
  {
    path: config.routes.listNumber,
    component: Number,
    layout: MainLayout,
  },
  {
    path: config.routes.addNumber,
    component: AddNumber,
    layout: MainLayout,
  },
  {
    path: config.routes.detailNumber,
    component: DetailNumber,
    layout: MainLayout,
  },
];
