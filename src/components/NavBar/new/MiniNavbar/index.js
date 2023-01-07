import {
  Button,
  Drawer,
  Grid,
  IconButton,
  Input,
  InputBase,
  makeStyles,
  Paper
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Headroom from "react-headroom";
import BrandName from "../../../../helpers/brandName";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SideBar from "../../../SideBar";
import useWindowSize from "../../../../helpers/customHooks/useWindowSize";

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#3e5060",
    letterSpacing:"0.5px"
  },
  root: {
    backgroundColor: theme.palette.grey[50],
    padding: "2px",
    border: "1px solid #ced4da",
    borderRadius: "0.8rem",
    width: "100%"
  },
  icon: {
    padding: "2px",
    color: theme.palette.primary.main
  },
  grid: {
    "& > *": {
      margin: theme.spacing(1)
    },
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  gridButton: {
    "& > *": {
      margin: theme.spacing(1)
    },
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
  }
}));

function MiniNavbar() {
  const classes = useStyles();

  const history = useHistory();
  const notification = () => {};
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openMenu, setOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };

  const windowSize = useWindowSize();

  const toggleDrawer = useCallback(state => {
    setOpenDrawer(state);
  }, []);

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

  return (
    <>
    <Headroom disableInlineStyles>
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
          <Grid item xs={12} md={3} container alignItems="center">
            <Grid
              item
              style={{
                flexGrow: 1
              }}
              onClick={() => {
                history.push("/");
              }}
              data-testid="navbarBrand"
            >
              <BrandName />
            </Grid>
            <Grid item className={classes.hamburger}>
              <IconButton>
                {window.innerWidth > 960 && (
                  <MenuIcon onClick={() => toggleDrawer(true)} />
                )}
                {window.innerWidth <= 960 && (
                  <MenuIcon onClick={() => toggleSlider()} />
                )}
              </IconButton>
            </Grid>
          </Grid>
          <Grid style={{display:'inline-block'}} item xs={12} md={4}>
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
              <InputBase style={{display:'inline-block', width:(screenSize.dynamicWidth<'959' && screenSize.dynamicWidth>'575')?'93.5%':'88.5%'}} className={classes.input} placeholder="Search..." />
            </Paper>
          </Grid>
          <Grid item className={classes.gridButton}>
            <Button
              variant="contained"
              color="primary"
              style={{
                boxShadow: "none",
                color: "white"
              }}
              className={classes.button}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{
                boxShadow: "none"
              }}
              className={classes.button}
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </nav>
      {windowSize.width > 960 && (
        <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer()}>
          <Grid
            container
            style={{
              width: 200
            }}
            direction="column"
          >
            <Grid item>
              <IconButton>
                <CloseIcon onClick={() => toggleDrawer(false)} />
              </IconButton>
            </Grid>

            <Grid
              item
              style={{
                padding: 10
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  boxShadow: "none",
                  color: "white"
                }}
                className={classes.button}
                onClick={() => {
                  toggleDrawer(false);
                  history.push("/login");
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid
              item
              style={{
                padding: 10
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{
                  boxShadow: "none"
                }}
                className={classes.button}
                onClick={() => {
                  toggleDrawer(false);
                  history.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Drawer>
      )}
    </Headroom>
      {windowSize.width <= 960 && (
        <SideBar
          open={openMenu}
          toggleSlider={toggleSlider}
          notification={notification}
        >
          {window.innerWidth <= 960 && (
            <>
              <Grid
                item
                style={{
                  padding: 10
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    boxShadow: "none",
                    color: "white"
                  }}
                  className={classes.button}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </Grid>
              <Grid
                item
                style={{
                  padding: 10
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    boxShadow: "none"
                  }}
                  className={classes.button}
                  onClick={() => {
                    history.push("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </>
          )}
        </SideBar>
      )}
    </>
  );
}

export default MiniNavbar;
