import React from "react";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Card, Tabs } from "antd";
import UserSignUp from "./UserSignUp";
import OrgSignUp from "./OrgSignUp";

const { Title } = Typography;

const SignUp = () => {
  return (
    <Card bordered={false}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        Join with us!
      </Title>
      <p />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Join as a user" key="1">
          <UserSignUp />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Join as an organization" key="2">
          <OrgSignUp />
        </Tabs.TabPane>
      </Tabs>

      <Row justify="center" align="center" className="mt-24">
        <Col sm={24} className="center">
          Already joined with CodeLabz? <Link to={"/login"}>Sign in</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default SignUp;
