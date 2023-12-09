import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlined from "@mui/icons-material/LockOutlined";
import MailOutlined from "@mui/icons-material/MailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import validator from "validator";
import { clearAuthError, signUp } from "../../../store/actions";
import Card from "@mui/material/Card";

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
  const [emailValidateErrorMessage, setEmailValidateErrorMessage] =
    useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidateError, setPasswordValidateError] = useState(false);
  const [passwordValidateErrorMessage, setPasswordValidateErrorMessage] =
    useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordValidateError, setConfirmPasswordValidateError] =
    useState(false);
  const [
    confirmPasswordValidateErrorMessage,
    setConfirmPasswordValidateErrorMessage
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

  const handleMouseDownPassword = event => event.preventDefault();

  const onChangeEmail = event => setEmail(event.target.value);
  const onChangePassword = event => setPassword(event.target.value);
  const onChangeConfirmPassword = event => {
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
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ) {
      setPasswordValidateError(true);
      setPasswordValidateErrorMessage(
        "Your password must be at least 8 characters including a lowercase letter, an uppercase letter, a number & a symbol."
      );
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
          autoFocus
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
            )
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
            )
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
            )
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              name="remember"
              color="primary"
              data-testId="TnC"
              style={{}}
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
          disabled={loading}
          data-testId="signUpButton"
          onClick={onSubmit}
          style={{
            color: "white",
            borderRadius: "30px",
            margin: "auto",
            padding: "10px"
          }}
        >
          {loading ? "Creating your account..." : "Create an account"}
        </Button>
      </Card>
    </>
  );
};

export default SignupForm;