import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import { signInWithGoogle, signInWithProviderID } from '../../store/actions';

const SmButtons = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12}>
        <GoogleLoginButton
          size="40px"
          onClick={() => signInWithGoogle()(firebase, dispatch)}
        />
      </Grid>
      <Grid xs={12}>
        <FacebookLoginButton
          size="40px"
          onClick={() => signInWithProviderID('facebook')(firebase, dispatch)}
        />
      </Grid>
      <Grid xs={12}>
        <TwitterLoginButton
          size="40px"
          onClick={() => signInWithProviderID('twitter')(firebase, dispatch)}
        />
      </Grid>
      <Grid xs={12}>
        <GithubLoginButton
          size="40px"
          onClick={() => signInWithProviderID('github')(firebase, dispatch)}
        />
      </Grid>
    </Grid>
  );
};

export default SmButtons;
