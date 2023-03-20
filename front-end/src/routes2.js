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
import Invoices1 from "components/Invoices/Invoices1";
import FixerInvoice from "components/Invoices/FixerInvoice";

const dashboardRoutes2 = [
  {
    path: "/invoices-customer",
    name: "Phiếu chờ sửa",
    icon: "content_paste",
    component: Invoices1,
    layout: "/admin",
  },
  {
    path: "/fixer",
    name: "Đơn sửa",
    icon: Equalizer,
    component: FixerInvoice,
    layout: "/admin",
  },
];

export default dashboardRoutes2;
