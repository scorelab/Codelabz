import React, { useState, useEffect } from "react";
import { Button, Row, Col, PageHeader } from "antd";
import signinImage from "../../assets/images/signin-image.svg";
import signupImage from "../../assets/images/signup-image.svg";
import forgotPassImage from "../../assets/images/forgot-pass.svg";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import BrandName from "../brandName";
import Login from "./Login";
import SignUp from "./SignUp";
import { UserIsNotAuthenticated } from "../../auth";
import ForgotPassword from "./ForgotPassword";
import MiniNavbar from "../MiniNavbar";

const AuthPage = ({ type }) => {
  const [show, setShow] = useState(false);
  const [showType, setShowType] = useState(type);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShowType(type);
      setShow(true);
    }, 200);
  }, [type]);

  return (
    <>
      <MiniNavbar type={type} />
      <Row
        align="middle"
        style={{ height: "calc(100vh - 87px)", overflowX: "hidden" }}
        justify="center"
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
            left={showType === "login"}
            right={showType === "signup" || showType === "forgotpassword"}
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
            left={showType === "login"}
            right={showType === "signup" || showType === "forgotpassword"}
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
    </>
  );
};

export default UserIsNotAuthenticated(AuthPage);
