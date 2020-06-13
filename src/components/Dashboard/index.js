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
import orgUser from "../../assets/images/org-user.svg";
import profileUser from "../../assets/images/profile-user.svg";
import Fade from "react-reveal/Fade";

const { Option } = Select;

const Dashboard = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOrgForm, setShowOrgForm] = useState(null);
  const [focusLeft, setFocusLeft] = useState(true);
  const [showImage, setShowImage] = useState(false);
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

  useEffect(() => {
    setShowImage(false);
    setTimeout(() => {
      setShowImage(focusLeft ? "user" : "org");
    }, 200);
  }, [focusLeft]);

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
    <div className="home-row">
      <Row align="middle" justify="space-between">
        <Col xs={24} className="col-pad-24 pt-32">
          <h2 className="mb-0 center">Welcome to CodeLabz!</h2>
          <h3 className="mb-0 center">
            Let's complete your profile before we dive in.
          </h3>
        </Col>
        <Col xs={24} sm={24} md={showOrgForm ? 16 : 12}>
          {error && (
            <Row>
              <Col xs={24} className="col-pad-24 pr-12 pb-0">
                <Alert
                  message={""}
                  description={error}
                  type="error"
                  closable
                  className="login-error mb-16"
                />
              </Col>
            </Row>
          )}

          <Form form={form} onFinish={onSubmit}>
            <Row>
              <Col
                xs={24}
                sm={24}
                md={showOrgForm ? 12 : 24}
                className="col-pad-24 pr-12 pt-8 pb-24"
                onFocus={() => setFocusLeft(true)}
              >
                <Card
                  title="Your Details"
                  className="auth-form-col"
                  style={{ margin: "0 auto" }}
                >
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
                        message: "Please select your country",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder={
                        <div style={{ textAlign: "left" }}>
                          <GlobalOutlined style={{ color: "rgba(0,0,0,.4)" }} />{" "}
                          Country
                        </div>
                      }
                      showSearch={true}
                    >
                      {children}
                    </Select>
                  </Form.Item>

                  <Form.Item className="mb-0">
                    <Button
                      type="dashed"
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
                </Card>
              </Col>
              <Col
                xs={showOrgForm ? 24 : 0}
                md={showOrgForm ? 12 : 0}
                className="col-pad-24 pl-12 pr-12 pt-8"
                onFocus={() => setFocusLeft(false)}
              >
                {showOrgForm && (
                  <Card title="Organization Details">
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
                          pattern: new RegExp(/^[a-z0-9]{1,}$/),
                          message:
                            "Organization handle can only contain lowercase alphanumeric characters",
                        },
                        {
                          pattern: new RegExp(/^[a-z0-9]{6,}$/),
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
                            "Please select the country of the organization",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder={
                          <div style={{ textAlign: "left" }}>
                            <GlobalOutlined
                              style={{ color: "rgba(0,0,0,.4)" }}
                            />{" "}
                            Country of the organization
                          </div>
                        }
                        showSearch={true}
                      >
                        {children}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="org_website"
                      className="mb-0"
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
                  </Card>
                )}
              </Col>
              <Col xs={24} className="center pl-24 pr-12 pb-32 pt-8">
                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    className="auth-form-col"
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col
          xs={0}
          sm={0}
          md={showOrgForm ? 8 : 12}
          className="col-pad-24 pl-12 pt-8"
        >
          <Fade right={true} when={showImage}>
            <img
              src={showImage === "user" ? profileUser : orgUser}
              alt="Background for auth"
              width="100%"
              className="dash-image"
            />
          </Fade>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
