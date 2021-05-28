import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Fade from 'react-reveal/Fade';
import forgotPassImage from '../../assets/images/forgot-pass.svg';
import signinImage from '../../assets/images/signin-image.svg';
import signupImage from '../../assets/images/signup-image.svg';
import { UserIsNotAuthenticated } from '../../auth';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';

const AuthPage = ({ type }) => {
  const [show, setShow] = useState(false);
  const [showType, setShowType] = useState(type);
  const isDesktop = useMediaQuery({
    query: '(min-device-width: 767px)',
  });

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShowType(type);
      setShow(true);
    }, 200);
  }, [type]);

  return (
    <Grid
      container
      alignItems="center"
      style={{ overflowX: 'hidden' }}
      justify="center"
      className="row-footer-below auth-margin"
      direction={
        showType === 'login' || showType === 'forgotpassword'
          ? 'row'
          : 'row-reverse'
      }
    >
      <Grid xs={false} sm={false} md={6} lg={7} className="auth-image-col">
        <Fade
          left={isDesktop ? showType === 'login' : false}
          right={
            isDesktop
              ? showType === 'signup' || showType === 'forgotpassword'
              : false
          }
          when={show}
        >
          <img
            src={
              showType === 'login'
                ? signinImage
                : showType === 'signup'
                ? signupImage
                : forgotPassImage
            }
            alt="Background for auth"
            width="100%"
            className={
              showType === 'login' || showType === 'forgotpassword'
                ? 'signin-image'
                : 'signup-image'
            }
          />
        </Fade>
      </Grid>
      <Grid xs={12} sm={12} md={5} lg={4} className="auth-form-col">
        <Fade
          left={isDesktop ? showType === 'login' : false}
          right={
            isDesktop
              ? showType === 'signup' || showType === 'forgotpassword'
              : false
          }
          when={show}
        >
          {showType === 'login' ? (
            <Login />
          ) : showType === 'signup' ? (
            <SignUp />
          ) : (
            <ForgotPassword />
          )}
        </Fade>
      </Grid>
    </Grid>
  );
};

export default UserIsNotAuthenticated(AuthPage);
