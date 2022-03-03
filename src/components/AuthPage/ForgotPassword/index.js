import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, sendPasswordResetEmail } from "../../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ForgotPass from "../../../pages/AuthPage/ForgotPassPage";

const ForgotPassword = ({
  rootBackground = "rgba(0,0,0,.01)",
  confirmationText = "We have sent you an email containing the link to reset your password .Please check your inbox including spams",
  fontweight = "800",
  buttonColor = "blue",
}) => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(true);
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

  const onSubmit = async (values) => {
    values.preventDefault();
    setError("");
    await sendPasswordResetEmail(email)(firebase, dispatch);
  };

  const useStyles = makeStyles({
    root: {
      padding: "2rem",
      background: rootBackground,
      border: "none",
      boxShadow: "none",
    },
    heading: {
      fontWeight: 600,
    },
  });
  const classes = useStyles();

  return (
    <ForgotPass
      classes={classes}
      open={open}
      setOpen={setOpen}
      error={error}
      setError={setError}
      confirmationText={confirmationText}
      onSubmit={onSubmit}
      setEmail={setEmail}
      loading={loading}
      rootBackground={rootBackground}
      confirmationText={confirmationText}
      fontweight={fontweight}
      buttonColor={buttonColor}
      success={success}
      setSuccess={setSuccess}
    />
  );
};

ForgotPassword.propTypes = {
  rootBackground: PropTypes.string,
  confirmationText: PropTypes.string,
  fontweight: PropTypes.string,
  buttonColor: PropTypes.string,
};

export default ForgotPassword;
