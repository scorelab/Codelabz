import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, Typography, Row, Col } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { confirmPasswordReset } from "../../../store/actions";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const { Title } = Typography;

const PasswordResetForm = ({ actionCode }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const errorProp = useSelector(({ auth }) => auth.recoverPassword.resetError);
  const loadingProp = useSelector(
    ({ auth }) => auth.recoverPassword.resetLoading
  );
  const email = useSelector(({ auth }) => auth.recoverPassword.user);

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);

  const onSubmit = async ({ password }) => {
    setError("");
    setLoading(true);
    await confirmPasswordReset({ actionCode, password })(firebase, dispatch);
    setLoading(false);
  };

  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [errorProp, loadingProp]);

  return (
    <>
      <Title level={4} style={{ textAlign: "center", marginBottom: "40px" }}>
        Reset password for {email}
      </Title>

      {error && (
        <Alert
          message={""}
          description={error}
          type="error"
          closable
          className="login-error mb-16"
        />
      )}

      {success && (
        <>
          <Alert
            message={""}
            description={"Successfully changed your password"}
            type="success"
            closable
            className="mb-16"
          />
          <Row justify="center" align="center" className="mt-24">
            <Col sm={24} className="center">
              <Link to={"/login"}>Sign in</Link>
            </Col>
          </Row>
        </>
      )}
      {!success && (
        <>
          <Form onFinish={onSubmit}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter a password",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please re-type the password",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered does not match"
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                required
                placeholder="Confirm password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? "Changing your password..." : "Change password"}
              </Button>
            </Form.Item>
          </Form>
          <Row justify="center" align="center" className="mt-24">
            <Col sm={24} className="center">
              Back to <Link to={"/login"}>CodeLabz</Link>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PasswordResetForm;
