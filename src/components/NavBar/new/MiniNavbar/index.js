import {
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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  root: {
    backgroundColor: theme.palette.grey[100],
    padding: "2px",
    border: "1px solid #ced4da",
    width: "100%",
  },
  icon: {
    padding: "1px",
  },
  grid: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    borderRadius: "10px",
  },
}));

function MiniNavbar() {
  const classes = useStyles();

  const history = useHistory();

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
            <div
              onClick={() => {
                history.push("/");
              }}
            >
              <BrandName />
            </div>
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
          <Grid item className={classes.grid}>
            <Button
              variant="contained"
              color="primary"
              style={{
                boxShadow: "none",
                color: "white",
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
                boxShadow: "none",
              }}
              className={classes.button}
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </nav>
    </Headroom>
  );
}

export default MiniNavbar;
