import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import Headroom from "react-headroom";
import BrandName from "../../../../helpers/brandName";
import SearchIcon from "@material-ui/icons/Search";
import RightMenu from "./RightMenu";
import LeftMenu from "./LeftMenu";

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: "2px",
    border: "1px solid #ced4da",
  },
  icon: {
    padding: "1px",
  },
  grid: {
    width: "auto",
    "& > *": {},
  },
  button: {
    borderRadius: "10px",
  },
}));

function MainNavbar() {
  const classes = useStyles();
  return (
    <Headroom>
      <nav
        style={{
          padding: "10px",
          background: "white",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <BrandName />
          </Grid>
          <Grid item xs={5}>
            <Paper component={"form"} className={classes.root} elevation={0}>
              <IconButton
                type="submit"
                aria-label="search"
                disableRipple
                className={classes.icon}
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
      </nav>
    </Headroom>
  );
}

export default MainNavbar;
