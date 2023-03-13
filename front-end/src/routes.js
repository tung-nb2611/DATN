import DashboardPage from "views/Dashboard/Dashboard.js";
import Employees from "./views/Employees/Employees";
import Customers from "./views/Customer/Customer";
import Services from "./views/Services/Services";
import Material from "./components/materials/Material";
import Invoices from "components/Invoices/Invoices";
import Statistics from "./views/Statistic/Statistics";
import {
  Equalizer,
  People,
  PeopleOutline,
  Build,
  BusinessCenter,
  Dashboard,
} from "@material-ui/icons";
import Store from "components/store/Store";
import Area from "components/Area/Area";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Tổng Quan",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin",
  // },
  {
    path: "/employees",
    name: "Nhân viên",
    icon: PeopleOutline,
    component: Employees,
    layout: "/admin",
  },

  {
    path: "/materials",
    name: "Kho hàng",
    icon: People,
    component: Material,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Dịch vụ",
    icon: Build,
    component: Services,
    layout: "/admin",
  },
  {
    path: "/Area",
    name: "Khu vực",
    icon: BusinessCenter,
    component: Area,
    layout: "/admin",
  },
  {
    path: "/invoices",
    name: "Phiếu sửa chữa",
    icon: "content_paste",
    component: Invoices,
    layout: "/admin",
  },
  {
    path: "/statistics",
    name: "Thống kê",
    icon: Equalizer,
    component: Statistics,
    layout: "/admin",
  },
];

export default dashboardRoutes;
