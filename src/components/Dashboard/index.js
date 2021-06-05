import React, { useEffect, useState } from "react";

import validator from "validator";

import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailOutlined from "@material-ui/icons/MailOutlined";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOrgHandleExists,
  checkUserHandleExists,
  clearProfileEditError,
  setUpInitialData,
} from "../../store/actions";

import countryList from "../../helpers/countryList";
import orgUser from "../../assets/images/org-user.svg";
import profileUser from "../../assets/images/profile-user.svg";
import Fade from "react-reveal/Fade";

const Dashboard = () => {
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

  //name
  const [name, setName] = useState("");
  const [nameValidateError, setNameValidateError] = useState(false);
  const [nameValidateErrorMessage, setNameValidateErrorMessage] = useState("");

  //organization name
  const [orgName, setOrgName] = useState("");
  const [orgNameValidateError, setOrgNameValidateError] = useState(false);
  const [
    orgNameValidateErrorMessage,
    setOrgNameValidateErrorMessage,
  ] = useState("");

  //handle
  const [handle, setHandle] = useState("");
  const [handleValidateError, setHandleValidateError] = useState(false);
  const [handleValidateErrorMessage, setHandleValidateErrorMessage] = useState(
    ""
  );

  //organization handle
  const [orgHandle, setOrgHandle] = useState("");
  const [orgHandleValidateError, setOrgHandleValidateError] = useState(false);
  const [
    orgHandleValidateErrorMessage,
    setOrgHandleValidateErrorMessage,
  ] = useState("");

  //country
  const [country, setCountry] = useState("");
  const [countryValidateError, setCountryValidateError] = useState(false);
  const [
    countryValidateErrorMessage,
    setCountryValidateErrorMessage,
  ] = useState("");

  //organization country
  const [orgCountry, setOrgCountry] = useState("");
  const [orgCountryValidateError, setOrgCountryValidateError] = useState(false);
  const [
    orgCountryValidateErrorMessage,
    setOrgCountryValidateErrorMessage,
  ] = useState("");

  //rganization website
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgWebsiteValidateError, setOrgWebsiteValidateError] = useState(false);
  const [
    orgWebsiteValidateErrorMessage,
    setOrgWebsiteValidateErrorMessage,
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
    validateHandle().then(async (validateHandle) => {
      if (showOrgForm) {
        validateOrgHandle().then(async (validateOrgHandle) => {
          validateCountry();
          validateOrgCountry();
          validateName();
          validateOrgName();
          validateOrgWebsite();
          if (
            validateCountry() &&
            validateOrgCountry() &&
            validateName() &&
            validateOrgName() &&
            validateHandle &&
            validateOrgHandle
          ) {
            setError("");
            await setUpInitialData({
              orgData: showOrgForm,
              name,
              handle,
              country,
              org_handle: orgHandle,
              org_name: orgName,
              org_website: orgWebsite,
              org_country: orgCountry,
            })(firebase, firestore, dispatch);
          } else {
            console.log("not validated");
          }
        });
      } else {
        validateCountry();
        validateName();
        if (validateCountry() && validateName() && validateHandle) {
          setError("");
          await setUpInitialData({
            orgData: showOrgForm,
            name,
            handle,
            country,
          })(firebase, firestore, dispatch);
        } else {
          console.log("not validated");
        }
      }
    });
  };

  const onChangeName = (name) => setName(name);
  const validateName = () => {
    if (validator.isEmpty(name)) {
      setNameValidateError(true);
      setNameValidateErrorMessage("Please enter your name");
      return false;
    } else if (!name.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
      setNameValidateError(true);
      setNameValidateErrorMessage("Please enter a real name");
      return false;
    } else {
      setNameValidateError(false);
      setNameValidateErrorMessage("");
      return true;
    }
  };

  const onChangeOrgName = (orgName) => setOrgName(orgName);
  const validateOrgName = () => {
    if (validator.isEmpty(orgName)) {
      setOrgNameValidateError(true);
      setOrgNameValidateErrorMessage("Please enter organization name");
      return false;
    } else if (!orgName.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
      setOrgNameValidateError(true);
      setOrgNameValidateErrorMessage("Please enter a real name");
      return false;
    } else {
      setOrgNameValidateError(false);
      setOrgNameValidateErrorMessage("");
      return true;
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

  const onChangeOrgHandle = (orgHandle) => setOrgHandle(orgHandle);
  const validateOrgHandle = async () => {
    const orgHandleExists = await checkOrgHandleExists(orgHandle)(
      firebase,
      dispatch
    );
    if (validator.isEmpty(orgHandle)) {
      setOrgHandleValidateError(true);
      setOrgHandleValidateErrorMessage("Please enter a handle");
      return false;
    } else if (
      !validator.isAlphanumeric(orgHandle) ||
      !validator.isLowercase(orgHandle)
    ) {
      setOrgHandleValidateError(true);
      setOrgHandleValidateErrorMessage(
        "Organization handle can only contain lowercase alphanumeric characters"
      );
      return false;
    } else if (orgHandle.length < 6) {
      setOrgHandleValidateError(true);
      setOrgHandleValidateErrorMessage(
        "Organization handle cannot be less than 6 characters"
      );
      return false;
    } else if (orgHandleExists) {
      setOrgHandleValidateError(true);
      setOrgHandleValidateErrorMessage(
        `The handle ${orgHandle} is already taken`
      );
      return false;
    } else {
      setOrgHandleValidateError(false);
      setOrgHandleValidateErrorMessage("");
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

  const onChangeOrgCountry = (orgCountry) => setOrgCountry(orgCountry);
  const validateOrgCountry = () => {
    console.log(orgCountry);
    if (validator.isEmpty(orgCountry)) {
      setOrgCountryValidateError(true);
      setOrgCountryValidateErrorMessage("Please select your country");
      return false;
    } else {
      setOrgCountryValidateError(false);
      setOrgCountryValidateErrorMessage("");
      return true;
    }
  };

  const onChangeOrgWebsite = (orgWebsite) => setOrgWebsite(orgWebsite);
  const validateOrgWebsite = () => {
    if (validator.isEmpty(orgWebsite)) {
      setOrgWebsiteValidateError(true);
      setOrgWebsiteValidateErrorMessage("Please enter organization website");
      return false;
    } else if (!validator.isURL(orgWebsite)) {
      setOrgWebsiteValidateError(true);
      setOrgWebsiteValidateErrorMessage("Please provide a valid URL");
      return false;
    } else {
      setOrgWebsiteValidateError(false);
      setOrgWebsiteValidateErrorMessage("");
      return true;
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
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              </Grid>
            </Grid>
          )}

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
                  <TextField
                    error={nameValidateError}
                    label="name"
                    variant="outlined"
                    placeholder={displayName ? displayName : ""}
                    value={name}
                    onChange={(event) => onChangeName(event.target.value)}
                    helperText={
                      nameValidateError ? nameValidateErrorMessage : null
                    }
                    fullWidth
                    autoComplete="handle"
                    required
                    style={{ marginBottom: "15px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
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
                          <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl
                    error={countryValidateError}
                    fullWidth
                    helperText={
                      countryValidateError ? countryValidateErrorMessage : null
                    }
                  >
                    <InputLabel>
                      <div style={{ textAlign: "left" }}>Country</div>
                    </InputLabel>
                    <Select
                      children={children}
                      style={{ width: "100%" }}
                      showSearch={true}
                      value={country}
                      onChange={(event) => onChangeCountry(event.target.value)}
                    ></Select>
                  </FormControl>

                  <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{
                      backgroundColor: "#3cafa9",
                    }}
                    onClick={() => setShowOrgForm(!showOrgForm)}
                  >
                    {showOrgForm === false
                      ? "I want to create an organization"
                      : showOrgForm === true
                      ? "I don't want to create an organization"
                      : "I want to create an organization"}
                  </Button>
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
                    <TextField
                      error={orgNameValidateError}
                      label="orgName"
                      variant="outlined"
                      value={orgName}
                      onChange={(event) => onChangeOrgName(event.target.value)}
                      helperText={
                        orgNameValidateError
                          ? orgNameValidateErrorMessage
                          : null
                      }
                      fullWidth
                      autoComplete="handle"
                      required
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
                    <TextField
                      error={orgHandleValidateError}
                      label="orgHandle"
                      variant="outlined"
                      placeholder="orgHandle"
                      value={orgHandle}
                      onChange={(event) =>
                        onChangeOrgHandle(event.target.value)
                      }
                      helperText={
                        orgHandleValidateError
                          ? orgHandleValidateErrorMessage
                          : null
                      }
                      fullWidth
                      autoComplete="orgHandle"
                      required
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
                    <FormControl
                      error={orgCountryValidateError}
                      fullWidth
                      helperText={
                        orgCountryValidateError
                          ? orgCountryValidateErrorMessage
                          : null
                      }
                    >
                      <InputLabel>
                        <div style={{ textAlign: "left" }}>
                          Organization Country
                        </div>
                      </InputLabel>
                      <Select
                        children={children}
                        style={{ width: "100%" }}
                        showSearch={true}
                        value={orgCountry}
                        onChange={(event) =>
                          onChangeOrgCountry(event.target.value)
                        }
                      ></Select>
                    </FormControl>
                    <TextField
                      error={orgWebsiteValidateError}
                      label="orgWebsite"
                      variant="outlined"
                      placeholder="orgWebsite"
                      value={orgWebsite}
                      onChange={(event) =>
                        onChangeOrgWebsite(event.target.value)
                      }
                      helperText={
                        orgWebsiteValidateError
                          ? orgWebsiteValidateErrorMessage
                          : null
                      }
                      fullWidth
                      autoComplete="orgWebsite"
                      required
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
                  </Box>
                </Card>
              )}
            </Grid>

            <Grid xs={12} className="center pl-24 pr-12 pb-32 pt-8">
              <Button
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#455a64",
                }}
                htmlType="submit"
                className="auth-form-col"
                onClick={onSubmit2}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
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
