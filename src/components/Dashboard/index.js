import React, { useEffect, useState, useRef } from "react";
import { Alert, Button, Form, Input, Select } from "antd";
import validator from "validator";
import {
  // Button,
  Card,
  Box,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutlined from "@material-ui/icons/MailOutlined";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Button as Button2 } from "@material-ui/core";
import { Select as Select2 } from "@material-ui/core";
import { FormControl, InputLabel, FormHelperText } from "@material-ui/core";

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
import {
  orgWebsiteValidation,
  orgHandleValidation,
  userHandleValidation,
} from "../../helpers/validationRules";

const { Option } = Select;

const Dashboard = () => {
  const form2 = useRef(null);
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

  const [handle, setHandle] = useState("");
  const [handleValidateError, setHandleValidateError] = useState(false);
  const [handleValidateErrorMessage, setHandleValidateErrorMessage] = useState(
    ""
  );

  const [country, setCountry] = useState("");
  const [countryValidateError, setCountryValidateError] = useState(false);
  const [
    countryValidateErrorMessage,
    setCountryValidateErrorMessage,
  ] = useState("");

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName },
      },
    }) => displayName
  );
  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <MenuItem key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </MenuItem>
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

  const onSubmit2 = async () => {
    validateHandle().then((validateHandle) => {
      console.log(validateCountry());
      if (validateHandle && validateCountry()) {
        setError("");
        console.log("validated");
      } else {
        console.log("not validated");
      }
    });
  };

  const onSubmit = async ({
    name,
    handle,
    country,
    org_handle,
    org_name,
    org_website,
    org_country,
  }) => {
    if (validateHandle()) {
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
    }
  };

  const onChangeHandle = (handle) => setHandle(handle);
  const validateHandle = async () => {
    const handleExists = await checkUserHandleExists(handle)(
      firebase,
      dispatch
    );
    if (validator.isEmpty(handle)) {
      setHandleValidateError(true);
      setHandleValidateErrorMessage("Please enter a handle");
      return false;
    } else if (
      !validator.isAlphanumeric(handle) ||
      !validator.isLowercase(handle)
    ) {
      setHandleValidateError(true);
      setHandleValidateErrorMessage(
        "User handle can only contain lowercase alphanumeric characters"
      );
      return false;
    } else if (handle.length < 6) {
      setHandleValidateError(true);
      setHandleValidateErrorMessage(
        "User handle cannot be less than 6 characters"
      );
      return false;
    } else if (handleExists) {
      setHandleValidateError(true);
      setHandleValidateErrorMessage(`The handle ${handle} is already taken`);
      return false;
    } else {
      setHandleValidateError(false);
      setHandleValidateErrorMessage("");
      return true;
    }
  };

  const onChangeCountry = (country) => setCountry(country);
  const validateCountry = () => {
    console.log(country);
    if (validator.isEmpty(country)) {
      setCountryValidateError(true);
      setCountryValidateErrorMessage("Please select your country");
      return false;
    } else {
      setCountryValidateError(false);
      setCountryValidateErrorMessage("");
      return true;
    }
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
          errors: [`The handle [${handle}] is already taken`],
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
          errors: [`The handle [${orgHandle}] is already taken`],
        },
      ]);
    }
  };

  const onFocusHandle = () => {
    setHandleValidateError(false);
    setHandleValidateErrorMessage("");
  };

  return (
    <div className="home-row">
      <Grid container alignItems="center" justify="space-between">
        <Grid xs={12} className="col-pad-24 pt-32">
          <h2 className="mb-0 center">Welcome to CodeLabz!</h2>
          <h3 className="mb-0 center">
            Let's complete your profile before we dive in.
          </h3>
        </Grid>
        <Grid xs={12} sm={12} md={showOrgForm ? 8 : 6}>
          {error && (
            <Grid container>
              <Grid xs={12} className="col-pad-24 pr-12 pb-0">
                <Alert
                  message={""}
                  description={error}
                  type="error"
                  closable
                  className={
                    "login-error mb-16 center " +
                    (!showOrgForm && "auth-form-col")
                  }
                />
              </Grid>
            </Grid>
          )}

          <Form form={form} onFinish={onSubmit}>
            <Grid container>
              <Grid
                xs={12}
                sm={12}
                md={showOrgForm ? 6 : 12}
                className="col-pad-24 pr-12 pt-8 pb-24 div-transition"
                onFocus={() => setFocusLeft(true)}
              >
                <Card className="auth-form-col" style={{ margin: "0 auto" }}>
                  <Box mt={2} mb={2} m={3}>
                    <Typography>
                      <Box fontSize={16} fontWeight="fontWeightBold" m={1}>
                        <p className="mb-0 ">Your Details</p>
                      </Box>
                    </Typography>
                  </Box>

                  <Divider />

                  <Box m={3}>
                    <Form.Item
                      name={"name"}
                      initialValue={displayName ? displayName : ""}
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
                          <UserAddOutlined
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Name"
                        autoComplete="email"
                      />
                    </Form.Item>

                    {/* material */}
                    <TextField
                      error={handleValidateError}
                      label="handle"
                      variant="outlined"
                      placeholder="handle"
                      value={handle}
                      onChange={(event) => onChangeHandle(event.target.value)}
                      helperText={
                        handleValidateError ? handleValidateErrorMessage : null
                      }
                      fullWidth
                      autoComplete="handle"
                      required
                      onFocus={onFocusHandle}
                      style={{ marginBottom: "15px" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* material */}
                    <Form.Item name={"handle"} rules={userHandleValidation}>
                      <Input
                        onBlur={onHandleChange}
                        prefix={
                          <UserAddOutlined
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="User Handle"
                        autoComplete="off"
                      />
                    </Form.Item>

                    {/* material */}
                    <FormControl
                      error={countryValidateError}
                      fullWidth
                      helperText={
                        countryValidateError
                          ? countryValidateErrorMessage
                          : null
                      }
                    >
                      <InputLabel>
                        <div style={{ textAlign: "left" }}>
                          <GlobalOutlined style={{ color: "rgba(0,0,0,.4)" }} />{" "}
                          Country
                        </div>
                      </InputLabel>
                      <Select2
                        children={children}
                        style={{ width: "100%" }}
                        showSearch={true}
                        value={country}
                        onChange={(event) =>
                          onChangeCountry(event.target.value)
                        }
                      ></Select2>
                    </FormControl>
                    {/* material */}
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
                            <GlobalOutlined
                              style={{ color: "rgba(0,0,0,.4)" }}
                            />{" "}
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
                        danger={showOrgForm ? true : false}
                      >
                        {showOrgForm === false
                          ? "I want to create an organization"
                          : showOrgForm === true
                          ? "I don't want to create an organization"
                          : "I want to create an organization"}
                      </Button>
                    </Form.Item>
                  </Box>
                </Card>
              </Grid>
              <Grid
                xs={showOrgForm ? 12 : 0}
                md={showOrgForm ? 6 : 0}
                className="col-pad-24 pl-12 pr-12 pt-8"
                onFocus={() => setFocusLeft(false)}
              >
                {showOrgForm && (
                  <Card>
                    <Box mt={2} mb={2} m={3}>
                      <Typography>
                        <Box fontSize={16} fontWeight="fontWeightBold" m={1}>
                          <p className="mb-0 ">Organization Details</p>
                        </Box>
                      </Typography>
                    </Box>

                    <Divider />

                    <Box m={3}>
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
                          autoComplete="organization"
                        />
                      </Form.Item>
                      <Form.Item
                        name={"org_handle"}
                        rules={orgHandleValidation}
                      >
                        <Input
                          onBlur={onOrgHandleChange}
                          prefix={
                            <AppstoreOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Organization Handle"
                          autoComplete="off"
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
                        rules={orgWebsiteValidation}
                        hasFeedback
                      >
                        <Input
                          prefix={
                            <IeOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                          }
                          placeholder="Website"
                          autoComplete="url"
                        />
                      </Form.Item>
                    </Box>
                  </Card>
                )}
              </Grid>

              {/* <Material> */}
              <Grid xs={12} className="center pl-24 pr-12 pb-32 pt-8">
                <Form.Item className="mb-0">
                  <Button2
                    size="small"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#455a64",
                    }}
                    htmlType="submit"
                    loading={loading}
                    className="auth-form-col"
                    onClick={onSubmit2}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button2>
                </Form.Item>
              </Grid>
              {/* </Material> */}
              <Grid xs={12} className="center pl-24 pr-12 pb-32 pt-8">
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
              </Grid>
            </Grid>
          </Form>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={showOrgForm ? 4 : 6}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
