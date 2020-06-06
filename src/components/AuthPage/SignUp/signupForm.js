import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Input, Checkbox } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { clearAuthError, signUp } from "../../../store/actions";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const authError = useSelector(({ firebase }) => firebase.authError);

  useEffect(() => setError(authError && authError.message), [authError]);

  useEffect(
    () => () => {
      clearAuthError()(dispatch);
    },
    [dispatch]
  );

  const onSubmit = async ({ accepted, email, password }) => {
    setError("");
    setLoading(true);
    if (accepted) {
      await signUp({ email, password })(firebase, dispatch);
    } else {
      return setError("Please accept the terms and conditions to proceed.");
    }
    setLoading(false);
  };

  return (
    <>
      {error && (
        <Alert
          message={""}
          description={error}
          type="error"
          closable
          className="login-error mb-16"
        />
      )}
      <Form onFinish={onSubmit}>
        <Form.Item
          name={"email"}
          rules={[
            {
              required: true,
              message: "Please enter your email address",
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
          <Form.Item name="accepted" valuePropName="checked" noStyle>
            <Checkbox>I accept the terms and conditions</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {loading ? "Creating your account..." : "Create an account"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;
