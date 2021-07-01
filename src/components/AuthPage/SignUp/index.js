import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import Divider from "../../../globalComponents/Divider";
import SmButtons from "../smButtons";
import SignupForm from "./signupForm";
import { makeStyles } from "@material-ui/core/styles";
import LoginImg from "../../../assets/images/login.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E1DDE3",
    height: "95vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "row",
  },
  card: {
    boxShadow: "none",
  },
  loginRight: {
    flex: "2.2",
    [theme.breakpoints.down(750)]: {
      flex: "0",
    },
  },
  loginLeft: {
    flex: "1.8",
    boxShadow: "none",
    [theme.breakpoints.down(750)]: {
      flex: "1",
    },
  },
  rootChildrenRight: {
    flex: "1.4",
    border: "2px solid black",
    boxShadow: "5px 5px 10px gray",
    background: "#759F9E",
    animation: "$myEffectFromLeft 1900ms",
  },
  rootChildrenLeft: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    animation: "$myEffectFromRight 1500ms",
    [theme.breakpoints.down(750)]: {
      flex: "0",
      display: "none",
    },
  },
  "@keyframes myEffectFromLeft": {
    "0%": {
      opacity: 1,
      transform: "scale(.4,.4) translate(-150vw) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0) translate(0vw)",
    },
  },
  "@keyframes myEffectFromRight": {
    "0%": {
      opacity: 1,
      transform: "scale(.7,.7) translate(100vw) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0) translate(0vw)",
    },
  },
}));

const SignUp = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid className={classes.rootChildrenLeft}>
        <Typography variant="h3" style={{ marginBottom: "2rem" }}>
          Welcome To <br />
          Your Journey
        </Typography>
        <Typography variant="body" style={{ maxWidth: "30rem" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "left",
        }}
        className={classes.rootChildrenRight}
      >
        <Card className="p-24 m-24" raised className={classes.loginLeft}>
          <CardContent>
            <Typography
              variant="h4"
              style={{ textAlign: "center", marginBottom: "40px" }}
            >
              Create an account
            </Typography>
            <SignupForm />
            <Divider>or</Divider>
            <SmButtons />
            <Grid
              container
              justify="center"
              alignItems="center"
              className="mt-24"
            >
              <Grid item={true} sm={12} className="center">
                Already have a{" "}
                <span className="brand-font text-bold">CodeLabz</span> account?{" "}
                <Link to="/login">Log In</Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Grid className={classes.loginRight}>
          <img
            src={LoginImg}
            style={{ height: "auto", width: "auto", marginTop: "5rem" }}
            alt="login"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
