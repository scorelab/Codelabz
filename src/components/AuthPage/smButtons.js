import Grid from "@material-ui/core/Grid";
import React from "react";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";
import GoogleImg from "../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import { signInWithGoogle, signInWithProviderID } from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { ScanOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));

const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const classes = useStyles();
  return (
    <Grid
      container
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-around",
        flexFlow: "row",
      }}
    >
      <Grid item>
        <img
          src={GoogleImg}
          alt="google"
          onClick={() => signInWithGoogle()(firebase, dispatch)}
          style={{ height: "35px" }}
          className={classes.button}
        />
      </Grid>
      <Grid>
        <FacebookIcon
          style={{
            fontSize: "40px",
            color: "#5269a4",
          }}
          className={classes.button}
          onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
        >
          <span className="sm-text">Facebook</span>
        </FacebookIcon>
      </Grid>
      <Grid className={classes.button}>
        <TwitterIcon
          style={{
            color: "#7194ef",
            fontSize: "40px",
          }}
          onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
        >
          <span className="sm-text">Twitter</span>
        </TwitterIcon>
      </Grid>
      <Grid className={classes.button}>
        <GitHubIcon
          style={{
            fontSize: "40px",
          }}
          onClick={() => signInWithProviderID("github")(firebase, dispatch)}
        >
          <span className="sm-text">Github</span>
        </GitHubIcon>
      </Grid>
    </Grid>
  );
};

export default SmButtons;
