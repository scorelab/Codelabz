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
import RightMenu from "../components/NavBar/MainNavbar/RightMenu";
import useGetPermissions from "./customHooks/useGetPermissions";
import { useAllowDashboard, useAuthStatus } from "./customHooks";

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
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("md")]: {
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
  const permissions = useGetPermissions();
  const allowDashboard = useAllowDashboard();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
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
    </Menu>
  );

  if (authed) {
    return (
      <div className={classes.grow} data-testId="navbarloggedIn">
        <AppBar position="static" color="white">
          <Toolbar className={classes.toolbar}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              data-testId="navbarBrand"
            >
              <Link to={"/"}>
                <BrandName />
              </Link>
            </Typography>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                data-testId="navbarSearch"
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            <div className={classes.grow} />

            <div className={classes.newButtonDesktop}>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "royalblue" }}
                endIcon={<AddIcon />}
              >
                New Codelab
              </Button>
            </div>

            <div className={classes.newButtonMobile}>
              <IconButton>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </div>

            <IconButton
              aria-label="appsIcon"
              className={classes.margin}
              onClick={handleMenuOpen}
              data-testId="navbarAppMenu"
            >
              <AppsIcon fontSize="large" />
            </IconButton>

            <div className={classes.sectionDesktop}>
              <RightMenu mode={"horizontal"} />
            </div>

            <div className={classes.sectionMobile}>
              <RightMenu mode={"horizontal"} />
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  } else {
    return (
      <div className={classes.grow} data-testId="navbarNonloggedIn">
        <AppBar position="static" color="white">
          <Toolbar className={classes.toolbar}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              data-testId="navbarBrand"
            >
              <Link to={"/"}>
                <BrandName />
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                data-testId="navbarSearch"
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.newButtonDesktop}>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "royalblue" }}
                endIcon={<AddIcon />}
              >
                New Codelab
              </Button>
            </div>
            <div className={classes.newButtonMobile}>
              <IconButton>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </div>
            &nbsp; &nbsp;
            <Link to={"/login"}>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "royalblue" }}
                data-testId="navbarlogin"
              >
                Log In
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default CodeLabzAppBar;
