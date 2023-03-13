import DashboardPage from "views/Dashboard/Dashboard.js";
import Employees from "./views/Employees/Employees";
import Customers from "./views/Customer/Customer";
import Services from "./views/Services/Services";
import Material from "./components/materials/Material";
import Invoices from "components/Invoices/Invoices";
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
import StatisticsAdmin from "./views/StaticAdmin/StatisticsAdmin";

const dashboardRoutes1 = [
  {
    path: "/services",
    name: "Dịch vụ",
    icon: Build,
    component: Services,
    layout: "/admin",
  },
  {
    path: "/store",
    name: "Cửa Hàng",
    icon: PeopleOutline,
    component: Store,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Thống kê",
    icon: Equalizer,
    component: StatisticsAdmin,
    layout: "/admin",
  },
];

export default dashboardRoutes1;
