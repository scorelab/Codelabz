import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../store/actions";
import { Form, Input, Button, Typography, Row, Col, Alert, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async values => {
    setError("");
    setLoading(true);
    try {
      await signIn({ email: values.email, password: values.password })(
        firebase,
        history
      );
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Row
      type="flex"
      align="middle"
      justify="space-around"
      style={{ height: "calc(100vh - 30px)" }}
    >
      <Col style={{ width: "400px" }}>
        <Card>
          <Title level={3} className="sign-in-text">
            Welcome back, sign in
          </Title>
          {error && (
            <Alert
              message={""}
              description={error}
              type="error"
              closable
              className="login-error"
            />
          )}

          <Form onFinish={onSubmit}>
            <Form.Item
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Please input your email address"
                },
                {
                  type: "email",
                  message: "Please enter a valid email address"
                }
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="mb-8">
              <Link to="/password-reset" className="forgot-password">
                Forgot password
              </Link>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
