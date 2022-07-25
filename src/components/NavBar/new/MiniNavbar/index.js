import {
  Button,
  Drawer,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper
} from "@material-ui/core";
import React, { useCallback } from "react";
import Headroom from "react-headroom";
import BrandName from "../../../../helpers/brandName";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SideBar from "../../../SideBar";

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: "2px",
    border: "1px solid #ced4da",
    width: "100%"
  },
  icon: {
    padding: "1px"
  },
  grid: {
    "& > *": {
      margin: theme.spacing(1)
    },
    [theme.breakpoints.down("md")]: {
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

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = useCallback(state => {
    setOpenDrawer(state);
  }, []);

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
                <MenuIcon onClick={() => toggleDrawer(true)} />
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
          <Grid item className={classes.grid}>
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
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
      >
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
          <Grid item>
            <SideBar />
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
    </Headroom>
  );
}

export default MiniNavbar;
