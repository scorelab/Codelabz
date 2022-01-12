import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import validator from "validator";
import { clearAuthError, signIn } from "../../../store/actions";
import useStyles from "./styles";
import PropTypes from "prop-types";
import LoginPage from "../../../pages/AuthPage/LoginPage"
const Login = ({ loginButton = "blue", background = "white", loginText = "Welcome Back" }) => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailValidateError, setEmailValidateError] = useState(false);
  const [emailValidateErrorMessage, setEmailValidateErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidateError, setPasswordValidateError] = useState(false);
  const [passwordValidateErrorMessage, setPasswordValidateErrorMessage] = useState("");

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
      setEmailValidateErrorMessage("Please Enter your Email!");
      return false;
    }
    if (!validator.isEmail(email)) {
      setEmailValidateError(true);
      setEmailValidateErrorMessage("Please enter an valid email!");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (validator.isEmpty(password)) {
      setPasswordValidateError(true);
      setPasswordValidateErrorMessage("Please enter your password!");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setError("");
    if (validateEmail() & validatePassword()) {
      await signIn({ email: email, password: password })(firebase, dispatch);
    }
  };

  const onFocusEmail = () => {
    setEmailValidateError(false);
    setEmailValidateErrorMessage("");
  };

  const onFocusPassword = () => {
    setPasswordValidateError(false);
    setPasswordValidateErrorMessage("");
  };

  return (
      <LoginPage
          onFocusPassword={onFocusPassword}loading={loading} setLoading={setLoading} error={error} setError={setError}
          classes={classes}  email={email} setEmail={setEmail} emailValidateError={emailValidateError} emailValidateErrorMessage={emailValidateErrorMessage}
          password={password} setPassword={setPassword} showPassword={showPassword} setShowPassword={setShowPassword}
          passwordValidateError={passwordValidateError} setPasswordValidateError={setPasswordValidateError}  passwordValidateErrorMessage={passwordValidateErrorMessage} setPasswordValidateErrorMessage={setPasswordValidateErrorMessage}
          handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} onChangeEmail={onChangeEmail}
          onChangePassword={onChangePassword}  validateEmail={validateEmail} validatePassword={validatePassword} onSubmit={onSubmit} onFocusEmail={onFocusEmail}
          onFocusPassword={onFocusPassword}
      />
  );
};

Login.propTypes = {
  loginButton: PropTypes.string,
  background: PropTypes.string,
  loginText: PropTypes.string,
};

export default Login;
