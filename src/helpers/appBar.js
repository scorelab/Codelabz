import React from "react";
import { Link, NavLink } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AppsIcon from "@material-ui/icons/Apps";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";

import BrandName from "./brandName";
import RightMenu from "../components/NavBar/_old/MainNavbar/RightMenu";
import useGetPermissions from "./customHooks/useGetPermissions";
import { useAllowDashboard, useAuthStatus } from "./customHooks";
import MainNavbar from "../components/NavBar/new/MainNavbar";
import MiniNavbar from "../components/NavBar/new/MiniNavbar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  newButtonDesktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  newButtonMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    left: "0%",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "whitesmoke",
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "50%",

    // If not mobile size
    [theme.breakpoints.up("md")]: {
      left: "20%",
      width: "40%",
      height: "50px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "500px",

    // If not mobile size
    [theme.breakpoints.up("md")]: {
      top: "20%",
      position: "absolute",
      transform: "translateY(-25%)",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    minHeight: 70,
  },
}));

const CodeLabzAppBar = () => {
  const authed = useAuthStatus();
  const classes = useStyles();

  if (authed) {
    return (
      <div className={classes.grow} data-testId="navbarloggedIn">
        <MainNavbar />
      </div>
    );
  } else {
    return (
      <div className={classes.grow} data-testId="navbarloggedIn">
        <MiniNavbar />
      </div>
    );
  }
};

export default CodeLabzAppBar;
