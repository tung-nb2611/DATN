import React, { useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import EmployeeService from "../../services/EmployeeService";
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({
    store: {},
  });
  useEffect(() => {
    async function fetchUser() {
      try {
        EmployeeService.getStaffById().then((res) => {
          let user = res.data;
          setUser({
            store: user.store,
          });
        });
      } catch (error) {}
    }
    fetchUser();
  }, []);
  function makeBrand() {
    var name;
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar
        className={classes.Header}
        style={{
          background: "#fff",
          boxShadow: " 0 2px 4px hsl(0deg 0% 66% / 25%)",
          height: "70px",
          zIndex: "1049px",
          width: "96%",
          transition: "all 150ms ease 0s",
          marginTop: "-10px",
          color: "#182537",
        }}
      >
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button
            color="transparent"
            href="#"
            className={classes.title}
            style={{ fontWeight: "600", fontSize: "18px" }}
          >
            {user.store.name}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
