import Grid from "@material-ui/core/Grid";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Fade from "react-reveal/Fade";
import { UserIsNotAuthenticated } from "../../auth";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthPage = ({ type }) => {
  const [show, setShow] = useState(false);
  const [showType, setShowType] = useState(type);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
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
      style={{ overflowX: "hidden" }}
      justify="center"
      className="row-footer-below auth-margin"
    >
      <Grid item={true}>
        <Fade when={show}>
          {showType === "login" ? (
            <Login />
          ) : showType === "signup" ? (
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
