import {
  Avatar,
  Button,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import Headroom from "react-headroom";
import BrandName from "../../../../helpers/brandName";
import SearchIcon from "@material-ui/icons/Search";
import RightMenu from "./RightMenu";
import LeftMenu from "./LeftMenu";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import SideBar from "../../../SideBar/index";
import useWindowSize from "../../../../helpers/customHooks/useWindowSize";

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width:"92%",
    [theme.breakpoints.down("md")]:{
      width:"80%"
    }
  },
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: "2px",
    border: "1px solid #ced4da"
  },
  icon: {
    padding: "1px"
  },
  grid: {
    width: "auto",
    "& > *": {},
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  button: {
    borderRadius: "10px"
  },
  hamburger: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  drawer: {
    width: 257
  }
}));

function MainNavbar() {
  const classes = useStyles();

  const history = useHistory();
  const windowSize = useWindowSize();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpen] = useState(true);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const notification = () => {};
  return (
    <Headroom>
      <nav
        style={{
          padding: "10px",
          background: "white"
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item container xs={12} md={2} alignItems="center">
            <Grid
              style={{
                flexGrow: "1"
              }}
            >
              <div
                onClick={() => {
                  history.push("/");
                }}
                data-testid="navbarBrand"
              >
                <BrandName />
              </div>
            </Grid>
            <Grid item className={classes.hamburger}>
              <IconButton
                onClick={() => {
                  toggleSlider();
                }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper component={"form"} className={classes.root} elevation={0}>
              <IconButton
                type="submit"
                aria-label="search"
                disableRipple
                className={classes.icon}
                data-testid="navbarSearch"
              >
                <SearchIcon />
              </IconButton>
              <InputBase className={classes.input} placeholder="Search" />
            </Paper>
          </Grid>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            className={classes.grid}
          >
            <Grid item justifyContent="center">
              <LeftMenu />
            </Grid>
            <Grid item>
              <RightMenu />
            </Grid>
          </Grid>
        </Grid>
        {windowSize.width <= 960 && (
          <SideBar
            collapseText={false}
            open={openMenu}
            toggleSlider={toggleSlider}
            notification={notification}
            drawWidth = {960}
          />
        )}
      </nav>
    </Headroom>
  );
}

export default MainNavbar;
