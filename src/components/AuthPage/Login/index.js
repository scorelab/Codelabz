import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlined from "@material-ui/icons/LockOutlined";
import MailOutlined from "@material-ui/icons/MailOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import validator from "validator";
import Divider from "../../../globalComponents/Divider";
import { clearAuthError, signIn } from "../../../store/actions";
import SmButtons from "../smButtons";
import ViewAlerts from "./ViewAlerts";
import { makeStyles } from "@material-ui/core/styles";
import LoginImg from "../../../assets/images/login.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ECEAEB",
    height: "95vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "row",
  },
  card: {
    boxShadow: "none",
  },
  loginLeft: {
    flex: "2.2",
    [theme.breakpoints.down(750)]: {
      flex: "0",
    },
  },
  loginRight: {
    flex: "1.8",
    boxShadow: "none",
    [theme.breakpoints.down(750)]: {
      flex: "1",
    },
  },
  rootChildrenLeft: {
    flex: "1.4",
    border: "2px solid black",
    boxShadow: "5px 5px 10px gray",
    background: "#759F9E",
    animation: "$myEffectFromRight 1900ms",
    zIndex: "2",
  },
  rootChildrenRight: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column",
    animation: "$myEffectFromLeft 1500ms",
    [theme.breakpoints.down(750)]: {
      flex: "0",
      display: "none",
    },
  },
  "@keyframes myEffectFromRight": {
    "0%": {
      opacity: 1,
      transform: "scale(.7,.7) translate(200vw) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0) translate(0vw)",
    },
  },
  "@keyframes myEffectFromLeft": {
    "0%": {
      opacity: 1,
      transform: "scale(.7,.7) translate(-100vw) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0) translate(0vw)",
    },
  },
}));

const Login = () => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const classes = useStyles();
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
    <Grid container className={classes.root}>
      <Grid
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "left",
        }}
        className={`${classes.rootChildrenLeft}`}
      >
        <Grid className={classes.loginLeft}>
          <img
            src={LoginImg}
            style={{ height: "auto", width: "auto", marginTop: "5rem" }}
            alt="login"
          />
        </Grid>

        <Card
          raised
          className={`${classes.card} ${classes.loginRight}  `}
          // className=
        >
          <CardContent>
            <Typography
              variant="h4"
              style={{ textAlign: "center", marginBottom: "40px" }}
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
                helperText={
                  emailValidateError ? emailValidateErrorMessage : null
                }
                error={emailValidateError}
                fullWidth
                autoComplete="email"
                required
                onFocus={onFocusEmail}
                style={{ marginBottom: "15px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
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
                    style={{ float: "right" }}
                  >
                    Forgot password
                  </Link>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log in"}
              </Button>
            </div>
            <Divider>or</Divider>
            <SmButtons />
            <Grid
              container
              justify="center"
              alignItems="center"
              className="mt-24"
            >
              <Grid item={true} sm={12} className="center">
                New to <span className="brand-font text-bold">CodeLabz</span>?{" "}
                <Link to={"/signup"}>Create an account</Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid className={classes.rootChildrenRight}>
        <Typography variant="h3" style={{ marginBottom: "2rem" }}>
          Welcome To <br />
          Your Journey
        </Typography>
        <Typography variant="body" style={{ maxWidth: "30rem" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
