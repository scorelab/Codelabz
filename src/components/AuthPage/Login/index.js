import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";
import { clearAuthError, signIn } from "../../../store/actions";
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
  Divider
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import SmButtons from "../smButtons";
import { useSelector, useDispatch } from "react-redux";
const { Title } = Typography;

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const authError = useSelector(({ firebase }) => firebase.authError);
  const dispatch = useDispatch();

  useEffect(() => setError(authError && authError.message), [authError]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  const onSubmit = async values => {
    setError("");
    setLoading(true);
    await signIn({ email: values.email, password: values.password })(
      firebase,
      history
    );
    setLoading(false);
  };

  return (
    <Card bordered={false}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        Welcome back!
      </Title>

      {error && (
        <Alert
          message={""}
          description={error}
          type="error"
          closable
          className="mb-16"
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
          <Link to="/" className="login-form-forgot" style={{ float: "right" }}>
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </Form.Item>
      </Form>
      <Divider>or</Divider>
      <SmButtons />
      <Row justify="center" align="center" className="mt-24">
        <Col sm={24} className="center">
          New to <span className="brand-font text-bold">CodeLabz</span>?{" "}
          <Link to={"/signup"}>Create an account</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default Login;
