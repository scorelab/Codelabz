import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Row, Button, Form, Input, Select } from "antd";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOrgHandleExists,
  checkUserHandleExists,
  clearProfileEditError,
  setUpInitialData,
} from "../../store/actions";
import {
  GlobalOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  IeOutlined,
} from "@ant-design/icons";
import countryList from "../../helpers/countryList";

const { Option } = Select;

const Dashboard = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOrgForm, setShowOrgForm] = useState(null);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const errorProp = useSelector(({ auth }) => auth.profile.error);
  const loadingProp = useSelector(({ auth }) => auth.profile.loading);
  const profile = useSelector(({ firebase }) => firebase.profile);
  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <Option key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </Option>
    );
  }

  useEffect(() => setError(errorProp), [errorProp]);
  useEffect(() => setLoading(loadingProp), [loadingProp]);

  useEffect(
    () => () => {
      clearProfileEditError()(dispatch);
    },
    [dispatch]
  );

  const onSubmit = async ({
    name,
    handle,
    country,
    org_handle,
    org_name,
    org_website,
    org_country,
  }) => {
    setError("");
    await setUpInitialData({
      orgData: showOrgForm,
      name,
      handle,
      country,
      org_handle,
      org_name,
      org_website,
      org_country,
    })(firebase, firestore, dispatch);
  };

  const onHandleChange = async () => {
    const handle = form.getFieldValue("handle");
    const handleExists = await checkUserHandleExists(handle)(
      firebase,
      dispatch
    );
    if (handleExists) {
      form.resetFields(["handle"]);
      form.setFields([
        {
          name: "handle",
          errors: [`The handle [${handle}] is already taken!`],
        },
      ]);
    }
  };

  const onOrgHandleChange = async () => {
    const orgHandle = form.getFieldValue("org_handle");
    const orgHandleExists = await checkOrgHandleExists(orgHandle)(
      firebase,
      dispatch
    );

    if (orgHandleExists) {
      form.resetFields(["org_handle"]);
      form.setFields([
        {
          name: "org_handle",
          errors: [`The handle [${orgHandle}] is already taken!`],
        },
      ]);
    }
  };

  return (
    <Card bordered={false}>
      <Row justify="center">
        <Col span={8} />
        <Col span={8}>
          <h2 style={{ textAlign: "center" }}>
            One thing before we go all the way in,
            <br />
            We need you to provide this info.
          </h2>
        </Col>
        <Col span={8} />
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={6} />
        <Col span={12}>
          <Card>
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

              <Form form={form} onFinish={onSubmit}>
                <Form.Item
                  name={"name"}
                  initialValue={profile.displayName}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name",
                    },
                    {
                      type: "string",
                      message: "Please enter a valid name",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <UserAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Name"
                  />
                </Form.Item>
                <Form.Item
                  name={"handle"}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your user handle",
                    },
                    {
                      pattern: new RegExp(/^[a-z0-9]{1,}$/),
                      message:
                        "User handle can only contain lowercase alphanumeric characters",
                    },
                    {
                      min: 6,
                      message: "User handle cannot be less than 6 characters",
                    },
                  ]}
                >
                  <Input
                    onBlur={onHandleChange}
                    prefix={
                      <UserAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="User Handle"
                  />
                </Form.Item>

                <Form.Item
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your country",
                    },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder={
                      <>
                        <GlobalOutlined style={{ color: "rgba(0,0,0,.4)" }} />{" "}
                        Country
                      </>
                    }
                    showSearch={true}
                  >
                    {children}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="ghost"
                    onClick={() => setShowOrgForm(!showOrgForm)}
                    block
                    loading={loading}
                  >
                    {showOrgForm === false
                      ? "I want to create an organization"
                      : showOrgForm === true
                      ? "I don't want to create an organization"
                      : "I want to create an organization"}
                  </Button>
                </Form.Item>
                {showOrgForm && (
                  <>
                    <Form.Item
                      name={"org_name"}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the organization name",
                        },
                        {
                          type: "string",
                          message: "Please provide a valid organization name",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <AppstoreAddOutlined
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Organization Name"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"org_handle"}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your organization handle",
                        },
                        {
                          pattern: new RegExp(/^[a-z0-9]{6,}$/),
                          message:
                            "Organization handle can only contain lowercase alphanumeric characters",
                        },
                        {
                          min: 6,
                          message:
                            "Organization handle cannot be less than 6 characters",
                        },
                      ]}
                    >
                      <Input
                        onBlur={onOrgHandleChange}
                        prefix={
                          <AppstoreOutlined
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Organization Handle"
                      />
                    </Form.Item>
                    <Form.Item
                      name="org_country"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please enter the country of the organization",
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder={
                          <>
                            <GlobalOutlined
                              style={{ color: "rgba(0,0,0,.4)" }}
                            />{" "}
                            Country of the organization
                          </>
                        }
                        showSearch={true}
                      >
                        {children}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="org_website"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please enter the website of the organization",
                        },
                        {
                          type: "url",
                          message: "Please provide a valid url",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input
                        prefix={
                          <IeOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        }
                        placeholder="Website"
                      />
                    </Form.Item>
                  </>
                )}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </Form.Item>
              </Form>
            </>
          </Card>
        </Col>
        <Col span={6} />
      </Row>
    </Card>
  );
};

export default Dashboard;
