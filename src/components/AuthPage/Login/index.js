import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  LockOutlined,
  MailOutlined,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Button from '../../../globalComponents/Button';
import Divider from '../../../globalComponents/Divider';
import { clearAuthError, signIn } from '../../../store/actions';
import SmButtons from '../smButtons';
import ViewAlerts from './ViewAlerts';

const Login = () => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [emailValidateError, setEmailValidateError] = useState(false);
  const [emailValidateErrorMessage, setEmailValidateErrorMessage] =
    useState('');

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidateError, setPasswordValidateError] = useState(false);
  const [passwordValidateErrorMessage, setPasswordValidateErrorMessage] =
    useState('');

  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const onChangeEmail = (event) => setEmail(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);

  const validateEmail = () => {
    if (validator.isEmpty(email)) {
      setEmailValidateError(true);
      setEmailValidateErrorMessage('Please Enter your Email!');
      return false;
    }
    if (!validator.isEmail(email)) {
      setEmailValidateError(true);
      setEmailValidateErrorMessage('Please enter an valid email!');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (validator.isEmpty(password)) {
      setPasswordValidateError(true);
      setPasswordValidateErrorMessage('Please enter your password!');
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (validateEmail() & validatePassword()) {
      setError('');
      await signIn({ email: email, password: password })(firebase, dispatch);
    }
  };

  const onFocusEmail = () => {
    setEmailValidateError(false);
    setEmailValidateErrorMessage('');
  };

  const onFocusPassword = () => {
    setPasswordValidateError(false);
    setPasswordValidateErrorMessage('');
  };

  return (
    <div className="pr-24 pl-24">
      <Typography
        variant="h4"
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        Welcome back!
      </Typography>
      <ViewAlerts error={error} email={email} />
      <div>
        <TextField
          error={emailValidateError}
          label="Email"
          variant="outlined"
          placeholder="mail@codelabz.com"
          value={email}
          onChange={onChangeEmail}
          helperText={emailValidateError ? emailValidateErrorMessage : null}
          error={emailValidateError}
          fullWidth
          autoComplete="email"
          required
          onFocus={onFocusEmail}
          style={{ marginBottom: '15px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          helperText={
            passwordValidateError ? passwordValidateErrorMessage : null
          }
          error={passwordValidateError}
          fullWidth
          required
          value={password}
          onFocus={onFocusPassword}
          onChange={onChangePassword}
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          style={{ marginBottom: '15px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Grid container alignItems="center" justify="space-between">
          <Grid>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </FormGroup>
          </Grid>
          <Grid>
            <Link
              to="/forgotpassword"
              className="login-form-forgot"
              style={{ float: 'right' }}
            >
              Forgot password
            </Link>
          </Grid>
        </Grid>

        <Button type="primary" onClick={onSubmit}>
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
      </div>
      <Divider>or</Divider>
      <SmButtons />
      <Grid container justify="center" alignItems="center" className="mt-24">
        <Grid sm={12} className="center">
          New to <span className="brand-font text-bold">CodeLabz</span>?{' '}
          <Link to={'/signup'}>Create an account</Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
