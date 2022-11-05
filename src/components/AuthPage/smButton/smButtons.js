import React from "react";
import { Grid, IconButton, Icon } from "@material-ui/core";
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
    <Grid container className={classes.root} data-testId="smButtons">
      <Grid item>
        <IconButton className={classes.button}>
          <Icon
            onClick={() => signInWithGoogle()(firebase, dispatch)}
            className={classes.google}
          >
            <img className={classes.imageIcon} src={GoogleImg} alt="google" />
          </Icon>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
          className={classes.button}
        >
          <FacebookIcon className={classes.fb}>
            <span className="sm-text">Facebook</span>
          </FacebookIcon>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
          className={classes.button}
        >
          <TwitterIcon className={classes.tw}>
            <span className="sm-text">Twitter</span>
          </TwitterIcon>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => signInWithProviderID("github")(firebase, dispatch)}
          className={classes.button}
        >
          <GitHubIcon className={classes.git}>
            <span className="sm-text">Github</span>
          </GitHubIcon>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SmButtons;
