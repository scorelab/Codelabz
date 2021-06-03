import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import useGetPermissions from "../../../helpers/customHooks/useGetPermissions";
import { useAllowDashboard } from "../../../helpers/customHooks";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";

const LeftMenu = ({ mode }) => {
  const permissions = useGetPermissions();
  const allowDashboard = useAllowDashboard();
  let { pathname: location } = useLocation();

  const useStyles = makeStyles((theme) => ({
    menu: {
      width: "76vw",
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down(767)]: {
        flexDirection: "column",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Grid
      container
      mode={mode}
      selectedKeys={location}
      className={classes.menu}
    >
      <MenuItem key="/codefeed">
        <NavLink to="/">CodeFeed</NavLink>
      </MenuItem>
      <MenuItem key="/tutorials">
        <NavLink to="/tutorials">Tutorials</NavLink>
      </MenuItem>
      {allowDashboard && (
        <MenuItem key="my-code-feed">
          <NavLink to="/dashboard/my_feed">My CodeFeed</NavLink>
        </MenuItem>
      )}
      {allowDashboard && permissions.length > 0 && (
        <MenuItem key="/organization">
          <NavLink to="/organization">Organizations</NavLink>
        </MenuItem>
      )}
    </Grid>
  );
};

export default LeftMenu;
