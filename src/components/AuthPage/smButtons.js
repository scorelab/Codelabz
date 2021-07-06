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
import { signInWithGoogle, signInWithProviderID } from "../../store/actions";

const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item={true} xs={12} md={6} lg={3}>
        <GoogleLoginButton
          size="40px"
          onClick={() => signInWithGoogle()(firebase, dispatch)}
        >
          <span className="sm-text">Google</span>
        </GoogleLoginButton>
      </Grid>
      <Grid item={true} xs={12} md={6} lg={3}>
        <FacebookLoginButton
          size="40px"
          onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
        >
          <span className="sm-text">Facebook</span>
        </FacebookLoginButton>
      </Grid>
      <Grid item={true} xs={12} md={6} lg={3}>
        <TwitterLoginButton
          size="40px"
          onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
        >
          <span className="sm-text">Twitter</span>
        </TwitterLoginButton>
      </Grid>
      <Grid item={true} xs={12} md={6} lg={3}>
        <GithubLoginButton
          size="40px"
          onClick={() => signInWithProviderID("github")(firebase, dispatch)}
        >
          <span className="sm-text">Github</span>
        </GithubLoginButton>
      </Grid>
    </Grid>
  );
};

export default SmButtons;
