import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { clearAuthError, signIn } from "../../../store/actions";
import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Checkbox,
  Divider,
} from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import SmButtons from "../smButtons";
import { useSelector, useDispatch } from "react-redux";
import ViewAlerts from "./ViewAlerts";
const { Title } = Typography;

const Login = () => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  const onSubmit = async (values) => {
    setError("");
    setEmail(values.email);
    await signIn({ email: values.email, password: values.password })(
      firebase,
      dispatch
    );
  };

  return (
    <div className="pr-24 pl-24">
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        Welcome back!
      </Title>
      <ViewAlerts error={error} email={email} />
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
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Please input your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link
            to="/forgotpassword"
            className="login-form-forgot"
            style={{ float: "right" }}
          >
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? "Logging in..." : "Log in"}
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
    </div>
  );
};

export default Login;
