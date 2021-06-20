import React from "react";
import errorImg from "../../assets/images/404.png";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Children } from "react";

const NotFound = () => {
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      height: "65vh",
      display: "flex",
      alignItems: "center",
      flexFlow: "column",
      justifyContent: "center",
    },
    image: {
      height: "10rem",
      width: "20rem",

      alignItems: "center",
      [theme.breakpoints.down(750)]: {
        height: "10rem",
        width: "15rem",
      },
    },
    oops: {
      listStyle: "none",
      flexFlow: "row",
      display: "flex",
      marginLeft: "-3rem",
      fontSize: "1.5rem",
      color: "#465E66",
      "& li:nth-child(1)": {
        transform: "rotate(-190deg) translateY(-20px)",
      },
      "& li:nth-child(2)": {
        transform: "rotate(-10deg)",
      },
      "& li:nth-child(3)": {
        transform: "rotate(0deg)",
      },
      "& li:nth-child(4)": {
        transform: "rotate(10deg)",
      },
      "& li:nth-child(5)": {
        transform: "rotate(10deg)",
      },
      "& li:nth-child(6)": {
        transform: "rotate(-10deg)",
      },
      "& li:nth-child(7)": {
        transform: "rotate(10deg)",
      },
      "& li:nth-child(8)": {
        transform: "rotate(10deg)",
      },
      "& li:nth-child(9)": {
        transform: "rotate(20deg)",
      },
      "& li:nth-child(10)": {
        transform: "rotate(20deg)",
      },
      "& li:nth-child(11)": {
        transform: "rotate(1deg)",
      },
    },
  }));
  const classes = useStyles();

  return (
    <Grid container className={`row-fullheight ${classes.wrapper}`}>
      <Grid
        item
        style={{ padding: "0", marginTop: "-5rem", marginLeft: "2rem" }}
      >
        <img className={classes.image} src={errorImg} alt="error" />
      </Grid>
      <Grid
        item
        style={{ marginTop: "2rem", display: "flex", alignItems: "center" }}
      >
        <Typography variant="h2">Oops!</Typography>
      </Grid>
      <Grid item>
        <ul className={classes.oops}>
          <li>P</li>
          <li>A</li>
          <li>G</li>
          <li>E</li>
          <li>!</li>
          <li style={{ fontSize: "1.5rem", marginLeft: "1rem" }}>B</li>
          <li>R</li>
          <li>O</li>
          <li>K</li>
          <li>E</li>
          <li>N</li>
        </ul>
      </Grid>
      <Grid item style={{ marginTop: "0" }}>
        <Typography variant="body">
          We can't seem to find the page you are looking for
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NotFound;
