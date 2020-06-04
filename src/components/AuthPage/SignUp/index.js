import React from "react";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Card, Divider } from "antd";
import SignupForm from "./signupForm";
import SmButtons from "../smButtons";

const { Title } = Typography;

const SignUp = () => {
  return (
    <Card bordered={false}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        Create an Account
      </Title>
      <SignupForm />
      <Divider>or</Divider>
      <SmButtons />
      <Row justify="center" align="center" className="mt-24">
        <Col sm={24} className="center">
          Already have a <span className="brand-font text-bold">CodeLabz</span>{" "}
          account? <Link to="/login">Log In</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default SignUp;
