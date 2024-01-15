import React, { useEffect, useState } from "react";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, sendPasswordResetEmail } from "../../../store/actions";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "@mui/styles";
import { Alert } from "@mui/material";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    padding: "2rem",
    background: "theme.palette.background.paper",
    border: "none",
    boxShadow: "none"
  },
  heading: {
    fontWeight: 600
  }
});

const ForgotPassword = ({
  rootBackground = "rgba(0,0,0,.01)",
  confirmationText = "We have sent you an email containing the link to reset your password .Please check your inbox including spams",
  fontweight = "800",
  buttonColor = "blue"
}) => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const errorProps = useSelector(({ auth }) => auth.profile.error);
  const loadingProps = useSelector(({ auth }) => auth.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => setError(errorProps), [errorProps]);
  useEffect(() => setLoading(loadingProps), [loadingProps]);
  useEffect(() => setOpen(true), [loadingProps]);

  useEffect(() => {
    if (errorProps === false && loadingProps === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProps, loadingProps]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  const onSubmit = async values => {
    values.preventDefault();
    setError("");
    await sendPasswordResetEmail(email)(firebase, dispatch);
  };

  const handleChange = e => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\s*$/;
    const isValid = emailRegex.test(enteredEmail);
    setIsValidEmail(isValid);
  };
  const classes = useStyles();

  return (
    <Card className={classes.root} data-testId="forgotPassword">
      <Typography
        variant="h4"
        className={"mb-24 text-center " + classes.heading}
      >
        Trouble logging in?
      </Typography>
      <p className="mb-24 text-center">
        Don't worry, we got it covered. <br />
        Enter the email address registered with us and
        <br /> we will send you a link to reset your password.
      </p>

      {error && (
        <Collapse in={open}>
          <Alert
            severity="error"
            className="mb-16"
            onClose={() => {
              setOpen(false);
            }}
            message={""}
          >
            {error}
          </Alert>
        </Collapse>
      )}

      {success && (
        <Collapse in={open}>
          <Alert
            severity="success"
            className="mb-16"
            onClose={() => {
              setOpen(false);
            }}
            message={""}
          >
            {confirmationText}
          </Alert>
        </Collapse>
      )}

      <form onSubmit={onSubmit}>
        <OutlinedInput
          placeholder="Email"
          autoComplete="email"
          onChange={handleChange}
          className="mb-32"
          fullWidth
          height="10rem"
          data-testId="forgotPasswordEmail"
          startAdornment={
            <InputAdornment sposition="start">
              <MailOutlineOutlinedIcon style={{ color: "rgba(0,0,0,.25)" }} />
              &nbsp;
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          color="primary"
          loading={loading}
          className="mt-10"
          type="submit"
          fullWidth
          data-testId="forgotPasswordButton"
          disabled={!isValidEmail}
        >
          {loading ? "Sending..." : "Send me the link"}
        </Button>
      </form>
      <Grid justify="center" align="center" className="mt-16">
        or
      </Grid>
      <Grid justify="center" align="center" className="mt-24">
        <Grid sm={24} className="center">
          <Link to={"/login"}>Back to Log In</Link>
        </Grid>
      </Grid>
      <Grid justify="center" align="center" className="mt-24">
        <Grid sm={24} className="center">
          New to <span className="brand-font text-bold">CodeLabz</span>?{" "}
          <Link to={"/signup"}>Create an account</Link>
        </Grid>
      </Grid>
    </Card>
  );
};

ForgotPassword.propTypes = {
  rootBackground: PropTypes.string,
  confirmationText: PropTypes.string,
  fontweight: PropTypes.string,
  buttonColor: PropTypes.string
};

export default ForgotPassword;
