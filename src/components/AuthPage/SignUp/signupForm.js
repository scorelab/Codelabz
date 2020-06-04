import React, { useState } from "react";
import { Alert, Button, Form, Input, Checkbox } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    setError("");
    setLoading(true);
    try {
      console.log(values);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
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
          name={"us_email"}
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
          name="us_password"
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
          dependencies={["us_password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please re-type the password",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("us_password") === value) {
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
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
