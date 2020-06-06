import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, sendPasswordResetEmail } from "../../../store/actions";
const { Title } = Typography;

const ForgotPassword = () => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);
  const dispatch = useDispatch();

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);

  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProp, loadingProp]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  const onSubmit = async values => {
    setError("");
    await sendPasswordResetEmail(values.email)(firebase, dispatch);
  };

  return (
    <Card bordered={false}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "40px" }}>
        Trouble logging in?
      </Title>
      <Title level={4} style={{ textAlign: "left", marginBottom: "40px" }}>
        Enter the email address registered with us and we will send you a link
        to reset your password.
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

      {success && (
        <Alert
          message={""}
          description={
            "We have sent you an email containing the link to reset your password. Please check your inbox including spams."
          }
          type="success"
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? "Now sending..." : "Send me the link"}
          </Button>
        </Form.Item>
      </Form>
      <Divider>or</Divider>
      <Row justify="center" align="center" className="mt-24">
        <Col sm={24} className="center">
          <Link to={"/login"}>Back to Sign in</Link>
        </Col>
      </Row>
      <Divider />
      <Row justify="center" align="center" className="mt-24">
        <Col sm={24} className="center">
          New to <span className="brand-font text-bold">CodeLabz</span>?{" "}
          <Link to={"/signup"}>Create an account</Link>
        </Col>
      </Row>
    </Card>
  );
};

export default ForgotPassword;
