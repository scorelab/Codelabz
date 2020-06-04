import React from "react";
import { Button, Row, Col, PageHeader } from "antd";
import authImage from "../../assets/images/auth-image.svg";
import { Link } from "react-router-dom";

/**
 *AuthPage HigherOrderComponent
 * @param {function} Component - ReactJSX Component
 * @param {string} type - Auth type (login | signup)
 * @returns {function(): *}
 * @constructor
 */
const AuthPage = (Component, type) => () => {
  return (
    <>
      <Row>
        <Col xs={24}>
          <PageHeader
            className="site-page-header"
            title={<h2 style={{ color: "#3AAFA9" }}>CodeLabz</h2>}
            backIcon={false}
            extra={[
              <Button key="2" type={type === "login" ? "primary" : "link"}>
                <Link to={"/login"}>Sign In</Link>
              </Button>,
              <Button key="1" type={type === "signup" ? "primary" : "link"}>
                <Link to={"/signup"}>Sign Up</Link>
              </Button>
            ]}
          />
        </Col>
      </Row>
      <Row
        align="middle"
        style={{ height: "calc(100vh - 100px)" }}
        justify="center"
      >
        <Col xs={0} sm={14} className="auth-image-col">
          <img
            src={authImage}
            alt="Background for auth"
            width="100%"
            className="auth-image"
          />
        </Col>
        <Col xs={24} sm={8} className="auth-form-col">
          {Component}
        </Col>
      </Row>
    </>
  );
};

export default AuthPage;
