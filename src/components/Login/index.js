import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../../store/actions";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Alert,
  Card,
  Checkbox,
  Divider,
  Space,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  SearchOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
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
    <Card bordered={false}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        Welcome back!
      </Title>
      <p></p>

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
              message: "Please input your email address",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="./" className="login-form-forgot" style={{ float: "right" }}>
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Form.Item>
      </Form>
      <Divider>or</Divider>
      <Row justify="center" align="center">
        <Col sm={16} className="center">
          <Space>
            <Button
              shape="circle"
              size="large"
              icon={<GoogleOutlined style={{ color: "#db3236" }} />}
            />
            <Button
              shape="circle"
              size="large"
              icon={<FacebookOutlined style={{ color: "#4267B2" }} />}
            />
            <Button
              shape="circle"
              size="large"
              icon={<TwitterOutlined style={{ color: "#1DA1F2" }} />}
            />
            <Button
              shape="circle"
              size="large"
              icon={<GithubOutlined style={{ color: "#211F1F" }} />}
            />
          </Space>
        </Col>
      </Row>
      <Row justify="center" align="center" className="mt-24">
        <Col sm={24} className="center">
          New to CodeLabz? <a href="./">Create an account</a>
        </Col>
      </Row>
    </Card>
  );
};

export default Login;
