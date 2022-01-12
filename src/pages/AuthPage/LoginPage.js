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
import { Link } from "react-router-dom";
import Divider from "../../globalComponents/Divider";
import SmButtons from "./smButton/smButtons";
import ViewAlerts from "../../components/AuthPage/Login/ViewAlerts";

const LoginPage = (props, { loginButton = "blue", background = "white", loginText = "Welcome Back" }) => {

  return (
    <Card raised className={`${props.classes.card}   `} style={{ background: background }} data-testId="login">
      <CardContent>
        <Typography variant="h4" style={{ textAlign: "center", marginBottom: "40px" }}>
          {props.loginText}
        </Typography>
        <ViewAlerts error={props.error} email={props.email} />
        <div>
          <TextField
            error={props.emailValidateError}
            label="Email"
            variant="outlined"
            placeholder="mail@codelabz.com"
            value={props.email}
            onChange={props.onChangeEmail}
            helperText={props.emailValidateError ? props.emailValidateErrorMessage : null}
            fullWidth
            autoComplete="email"
            required
            onFocus={props.onFocusEmail}
            className="email"
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
            helperText={props.passwordValidateError ? props.passwordValidateErrorMessage : null}
            className="password"
            error={props.passwordValidateError}
            fullWidth
            required
            value={props.password}
            onFocus={props.onFocusPassword}
            onChange={props.onChangePassword}
            autoComplete="current-password"
            type={props.showPassword ? "text" : "password"}
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
                    onClick={props.handleClickShowPassword}
                    onMouseDown={props.handleMouseDownPassword}
                  >
                    {props.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid container alignItems="center" justify="space-between">
            <Grid>
              <FormGroup row>
                <FormControlLabel control={<Checkbox name="remember" color="primary" />} label="Remember me" />
              </FormGroup>
            </Grid>
            <Grid>
              <Link
                data-testId="forgotPassoword"
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
            onClick={props.onSubmit}
            disabled={props.loading}
            className="loginButton"
            style={{ background: loginButton, backgroundColor: "royalblue" }}
          >
            {props.loading ? "Logging in..." : "Log in"}
          </Button>
        </div>
        <Divider>or</Divider>
        <SmButtons />
        <Grid container justify="center" alignItems="center" className="mt-24">
          <Grid item={true} sm={12} className="center">
            New to <span className="brand-font text-bold">CodeLabz</span>? <Link to={"/signup"}>Create an account</Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
