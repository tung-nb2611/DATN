import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "components/Login/Login";
import reduxStore from "./util/reduxStore";
import {
  createSapoTheme,
  UIComponentProvider,
} from "@sapo-presentation/sapo-ui-components";
import { createMuiTheme } from "@material-ui/core";
import typography from "./typography";
import { colorBorder, colorInk } from "./palette";
import "react-toastify/dist/ReactToastify.css";
import EmployeeService from "services/EmployeeService";
import Login1 from "components/Login/login1";
const hist = createBrowserHistory();
const logged = window.sessionStorage.getItem("jwt");
const store = reduxStore();

const colorTextPrimary = "#0F1824";
const colorTextSecondary = "#747C87";

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        path="/admin"
        render={() => {
          return window.sessionStorage.getItem("jwt") ? (
            <UIComponentProvider>
              <Admin />
            </UIComponentProvider>
          ) : (
            <Redirect to="/login" />,
            <Redirect to="/login/admin" />
          );
        }}
      />
      <Route path="/login" component={Login} />
      <Route path="/login/admin" component={Login1} />
      <Redirect from="/" to="/admin/areas" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
