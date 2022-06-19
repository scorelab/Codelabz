import React from "react";
import useStyles from "./styles";
import PropTypes from "prop-types";
import SignUpPage from "../../../pages/AuthPage/SignUpPage";
const SignUp = ({ background = "white" }) => {
  const classes = useStyles();
  return <SignUpPage classes={classes} background={background} />;
};
SignUp.prototype = {
  background: PropTypes.string,
};

export default SignUp;
