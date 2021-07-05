import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import { signInWithGoogle, signInWithProviderID } from "../../../store/actions";
import useStyles from "./styles";

const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item>
        <img
          src={GoogleImg}
          alt="google"
          onClick={() => signInWithGoogle()(firebase, dispatch)}
          className={classes.button}
        />
      </Grid>
      <Grid>
        <FacebookIcon
          className={` ${classes.button} ${classes.fb} `}
          onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
        >
          <span className="sm-text">Facebook</span>
        </FacebookIcon>
      </Grid>
      <Grid className={classes.button}>
        <TwitterIcon
          onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
          className={classes.tw}
        >
          <span className="sm-text">Twitter</span>
        </TwitterIcon>
      </Grid>
      <Grid className={classes.button}>
        <GitHubIcon
          className={classes.git}
          onClick={() => signInWithProviderID("github")(firebase, dispatch)}
        >
          <span className="sm-text">Github</span>
        </GitHubIcon>
      </Grid>
    </Grid>
  );
};

export default SmButtons;
