import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlined from "@material-ui/icons/LockOutlined";
import MailOutlined from "@material-ui/icons/MailOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import validator from "validator";
import { clearAuthError, signUp } from "../../../store/actions";
import Card from "@material-ui/core/Card";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);

  const [errorOpen, setErrorOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValidateError, setEmailValidateError] = useState(false);
  const [emailValidateErrorMessage, setEmailValidateErrorMessage] = useState(
    ""
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidateError, setPasswordValidateError] = useState(false);
  const [
    passwordValidateErrorMessage,
    setPasswordValidateErrorMessage,
  ] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [
    confirmPasswordValidateError,
    setConfirmPasswordValidateError,
  ] = useState(false);
  const [
    confirmPasswordValidateErrorMessage,
    setConfirmPasswordValidateErrorMessage,
  ] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [agreedText, setAgreedText] = useState(false);

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProp, loadingProp]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const onChangeEmail = (event) => setEmail(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

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

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordValidateError(true);
      setConfirmPasswordValidateErrorMessage(
        "The two passwords that you entered does not match!"
      );
      return false;
    }
    setConfirmPasswordValidateError(false);
    setConfirmPasswordValidateErrorMessage(null);
    return true;
  };

  const onSubmit = async () => {
    if (
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword() &&
      agreed
    ) {
      await signUp({ email, password })(firebase, dispatch);
    } else {
      setAgreedText(true);
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

  const onFocusConfirmPassword = () => {
    setConfirmPasswordValidateError(false);
    setConfirmPasswordValidateErrorMessage("");
  };

  return (
    <>
      {error && (
        <Collapse in={errorOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            className="login-error mb-16"
          >
            {error}
          </Alert>
        </Collapse>
      )}

      {success && (
        <Collapse in={success}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            className="mb-16"
          >
            Successfully registered. Please check your email for the
            verification link.
          </Alert>
        </Collapse>
      )}

      <Card data-testId="signUpForm" style={{ boxShadow: "none" }}>
        <TextField
          label="Email"
          variant="outlined"
          placeholder="mail@codelabz.com"
          value={email}
          onChange={onChangeEmail}
          helperText={emailValidateError ? emailValidateErrorMessage : null}
          error={emailValidateError}
          fullWidth
          data-testId="signUpEmail"
          autoComplete="email"
          required
          onFocus={onFocusEmail}
          style={{ marginBottom: "15px", marginTop: "12px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New password"
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
          data-testId="signUpPassword"
          autoComplete="new-password"
          type={showPassword ? "text" : "password"}
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
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
        <TextField
          label="Confirm password"
          variant="outlined"
          helperText={
            confirmPasswordValidateError
              ? confirmPasswordValidateErrorMessage
              : null
          }
          error={confirmPasswordValidateError}
          fullWidth
          required
          data-testId="signUpConfirmPassword"
          value={confirmPassword}
          onFocus={onFocusConfirmPassword}
          onChange={onChangeConfirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              name="remember"
              color="primary"
            />
          }
          label="By creating an account, you agree to our terms and conditions."
        />
        {agreedText && !agreed ? (
          <div style={{ color: "red", padding: "5px" }}>
            {" "}
            You have to agree to our terms and conditions in order to register
          </div>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onSubmit}
          disabled={loading}
          data-testId="signUpButton"
        >
          {loading ? "Creating your account..." : "Create an account"}
        </Button>
      </Card>
    </>
  );
};

export default SignupForm;
