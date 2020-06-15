import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import signinImage from "../../assets/images/signin-image.svg";
import signupImage from "../../assets/images/signup-image.svg";
import forgotPassImage from "../../assets/images/forgot-pass.svg";
import Fade from "react-reveal/Fade";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserIsNotAuthenticated } from "../../auth";
import ForgotPassword from "./ForgotPassword";
import { useMediaQuery } from "react-responsive";

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
    <Row
      align="middle"
      style={{ overflowX: "hidden" }}
      justify="center"
      className="row-fullheight mt-24 mb-24"
    >
      <Col
        xs={0}
        sm={0}
        md={12}
        lg={14}
        order={showType === "login" || showType === "forgotpassword" ? 1 : 2}
        className="auth-image-col"
      >
        <Fade
          left={isDesktop ? showType === "login" : false}
          right={
            isDesktop
              ? showType === "signup" || showType === "forgotpassword"
              : false
          }
          when={show}
        >
          <img
            src={
              showType === "login"
                ? signinImage
                : showType === "signup"
                ? signupImage
                : forgotPassImage
            }
            alt="Background for auth"
            width="100%"
            className={
              showType === "login" || showType === "forgotpassword"
                ? "signin-image"
                : "signup-image"
            }
          />
        </Fade>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={10}
        lg={8}
        order={showType === "login" || showType === "forgotpassword" ? 2 : 1}
        className="auth-form-col"
      >
        <Fade
          left={isDesktop ? showType === "login" : false}
          right={
            isDesktop
              ? showType === "signup" || showType === "forgotpassword"
              : false
          }
          when={show}
        >
          {showType === "login" ? (
            <Login />
          ) : showType === "signup" ? (
            <SignUp />
          ) : (
            <ForgotPassword />
          )}
        </Fade>
      </Col>
    </Row>
  );
};

export default UserIsNotAuthenticated(AuthPage);
