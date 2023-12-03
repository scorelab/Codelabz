import React, { useEffect, useState } from "react";

import { Alert } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BusinessIcon from "@mui/icons-material/Business";

import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOrgHandleExists,
  checkUserHandleExists,
  clearProfileEditError,
  setUpInitialData
} from "../../store/actions";
import { makeStyles } from "@mui/styles";
import countryList from "../../helpers/countryList";
import orgUser from "../../assets/images/org-user.svg";
import profileUser from "../../assets/images/profile-user.svg";
import Fade from "react-reveal/Fade";
import "../../css/Searchbar/searchbar.css";

import {
  validateName,
  validateHandle,
  validateCountry,
  validateOrgWebsite
} from "../../helpers/validations";
import PropTypes from "prop-types";

const Dashboard = ({ background = "white", textColor = "black" }) => {

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
	const [name, setName] = useState("");
	const [nameValidateError, setNameValidateError] = useState(false);
	const [nameValidateErrorMessage, setNameValidateErrorMessage] = useState("");
	const [orgName, setOrgName] = useState("");
	const [orgNameValidateError, setOrgNameValidateError] = useState(false);
	const [orgNameValidateErrorMessage, setOrgNameValidateErrorMessage] =
		useState("");
	const [handle, setHandle] = useState("");
	
	const [handleValidateError, setHandleValidateError] = useState(false);
	const [handleValidateErrorMessage, setHandleValidateErrorMessage] =useState("");
	
	const [orgHandle, setOrgHandle] = useState("");
	const [orgHandleValidateError, setOrgHandleValidateError] = useState(false);
	const [orgHandleValidateErrorMessage, setOrgHandleValidateErrorMessage] =
		useState("");
	const [country, setCountry] = useState("");
	const [countryValidateError, setCountryValidateError] = useState(false);
	const [orgCountry, setOrgCountry] = useState("");
	const [orgCountryValidateError, setOrgCountryValidateError] = useState(false);
	const [orgWebsite, setOrgWebsite] = useState("");
	const [orgWebsiteValidateError, setOrgWebsiteValidateError] = useState(false);


  const [filteredData, setFilteredData] = useState([]);
  const [countrySearch, setCountrySearch] = useState("");

  const [orgFilteredData, setOrgFilteredData] = useState([]);
  const [orgCountrySearch, setOrgCountrySearch] = useState("");

  const [orgWebsiteValidateErrorMessage, setOrgWebsiteValidateErrorMessage] =
    useState("");

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName }
      }
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

  const validated = () => {
    if (showOrgForm) {
      const nameValid = validateName(
        name,
        setNameValidateError,
        setNameValidateErrorMessage,
        "Please enter your name",
        "Please enter a real name"
      );
      const orgNameValid = validateName(
        orgName,
        setOrgNameValidateError,
        setOrgNameValidateErrorMessage,
        "Please enter organization name",
        "Please enter a real name"
      );
      const countryValid = validateCountry(country, setCountryValidateError);
      const orgCountryValid = validateCountry(
        orgCountry,
        setOrgCountryValidateError
      );
      const orgWebsiteValid = validateOrgWebsite(
        orgWebsite,
        setOrgWebsiteValidateError,
        setOrgWebsiteValidateErrorMessage
      );
      if (
        nameValid &&
        orgNameValid &&
        countryValid &&
        orgCountryValid &&
        orgWebsiteValid
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      const nameValid = validateName(
        name,
        setNameValidateError,
        setNameValidateErrorMessage,
        "Please enter your name",
        "Please enter a real name"
      );
      const countryValid = validateCountry(country, setCountryValidateError);
      if (nameValid && countryValid) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    const handleSearch = () => {
      const searchInput = countrySearch;
      const newFilteredData = countryList.filter(
        value =>
          value.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1 ||
          value.code.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
      );
      if (searchInput === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilteredData);
      }
    };
    handleSearch();
  }, [countrySearch]);

  useEffect(() => {
    const handleOrgCountrySearch = () => {
      const searchOrgCountryInput = orgCountrySearch;
      const newFilteredData = countryList.filter(
        value =>
          value.name
            .toLowerCase()
            .indexOf(searchOrgCountryInput.toLowerCase()) > -1 ||
          value.code
            .toLowerCase()
            .indexOf(searchOrgCountryInput.toLowerCase()) > -1
      );
      if (searchOrgCountryInput === "") {
        setOrgFilteredData([]);
      } else {
        setOrgFilteredData(newFilteredData);
      }
    };
    handleOrgCountrySearch();
  }, [orgCountrySearch]);

  const onSubmit = async () => {
    validateHandle(
      checkUserHandleExists,
      firebase,
      dispatch,
      handle,
      setHandleValidateError,
      setHandleValidateErrorMessage,
      "Please enter a handle",
      "User handle can only contain lowercase alphanumeric characters",
      "User handle cannot be less than 6 characters",
      `The handle ${handle} is already taken`
    ).then(async validateUserHandle => {
      if (showOrgForm) {
        validateHandle(
          checkOrgHandleExists,
          firebase,
          dispatch,
          orgHandle,
          setOrgHandleValidateError,
          setOrgHandleValidateErrorMessage,
          "Please enter a handle",
          "Organization handle can only contain lowercase alphanumeric characters",
          "Organization handle cannot be less than 6 characters",
          `The handle ${orgHandle} is already taken`
        ).then(async validateOrgHandle => {
          if (validated() && validateOrgHandle && validateUserHandle) {
            setError("");
            await setUpInitialData({
              orgData: showOrgForm,
              name,
              handle,
              country,
              org_handle: orgHandle,
              org_name: orgName,
              org_website: orgWebsite,
              org_country: orgCountry
            })(firebase, firestore, dispatch);
          }
        });
      } else {
        if (validated() && validateUserHandle) {
          setError("");
          await setUpInitialData({
            orgData: showOrgForm,
            name,
            handle,
            country
          })(firebase, firestore, dispatch);
        }
      }
    });
  };

  //If display Name is present then show that as value inside user name input
  useEffect(() => {
    if (displayName) {
      setName(displayName);
    }
  }, [displayName]);

  //OnChange
  const onChangeName = name => setName(name);
  const onChangeOrgName = orgName => setOrgName(orgName);
  const onChangeHandle = handle => setHandle(handle);
  const onChangeOrgHandle = orgHandle => setOrgHandle(orgHandle);
  const onChangeCountry = country => setCountry(country);
  const onChangeOrgCountry = orgCountry => setOrgCountry(orgCountry);
  const onChangeOrgWebsite = orgWebsite => setOrgWebsite(orgWebsite);

  const onFocusHandle = () => {
    setHandleValidateError(false);
    setHandleValidateErrorMessage("");
  };
  console.log(country);

  return (
    <div className="home-row" style={{ background: background }}>
      <Grid container alignItems="center" justify="space-between">
        <Grid xs={12} className="col-pad-24 pt-32" item={true}>
          <h2 className="mb-0 center" style={{ color: textColor }}>
            Welcome to CodeLabz!
          </h2>
          <h3 className="mb-0 center" style={{ color: textColor }}>
            Let's complete your profile before we dive in.
          </h3>
        </Grid>

        <Grid xs={12} sm={12} md={showOrgForm ? 12 : 6} item={true}>
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
              item={true}
            >
              <Card className="auth-form-col" style={{ margin: "0 auto" }}>
                <Box mt={2} mb={2} m={3}>
                  <Box
                    fontSize={16}
                    fontWeight="fontWeightBold"
                    m={1}
                    style={{ color: textColor }}
                  >
                    Your Details
                  </Box>
                </Box>

                <Divider />

                <Box m={3}>
                  <TextField
                    error={nameValidateError}
                    label="User Name"
                    variant="outlined"
                    placeholder={displayName || "User Name"}
                    value={name}
                    onChange={event => onChangeName(event.target.value)}
                    helperText={
                      nameValidateError ? nameValidateErrorMessage : null
                    }
                    fullWidth
                    autoComplete="handle"
                    required
                    style={{ marginBottom: "15px" }}
                    InputProps={{
                      "data-testid": "userName",
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    error={handleValidateError}
                    label="User Handle"
                    variant="outlined"
                    placeholder="User Handle"
                    value={handle}
                    onChange={event => onChangeHandle(event.target.value)}
                    helperText={
                      handleValidateError ? handleValidateErrorMessage : null
                    }
                    fullWidth
                    autoComplete="handle"
                    required
                    onFocus={onFocusHandle}
                    style={{ marginBottom: "15px" }}
                    InputProps={{
                      "data-testid": "userHandle",
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                  <div width="100%">
                    <TextField
                      error={countryValidateError}
                      label="User Country"
                      variant="outlined"
                      placeholder="User Country"
                      value={country}
                      onChange={e => {
                        setCountry(e.target.value);
                        setCountrySearch(e.target.value);
                      }}
                      onFocus={() => {
                        setCountrySearch(country);
                        onFocusHandle();
                      }}
                      fullWidth
                      autoComplete="country"
                      required
                      style={{ marginBottom: "15px" }}
                      InputProps={{
                        "data-testid": "userCountry",
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <div>
                      {filteredData.length !== 0 && (
                        <div className="dataOutput">
                          {filteredData.map(item => {
                            return (
                              <div
                                onClick={e => {
                                  setCountry(item.name);
                                  setCountrySearch("");
                                }}
                                style={{ color: textColor }}
                              >
                                <span>{item.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </Box>
                <Divider></Divider>
                <Box m={3}>
                  <Button
                    data-testid="createOrgBtn"
                    size="small"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disableElevation
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
            {/* col-pad-24 pr-12 pt-8 pb-24 div-transition */}
            <Grid
              xs={showOrgForm ? 12 : null}
              md={showOrgForm ? 6 : null}
              style={{ paddingLeft: "24px" }}
              className="pr-12 pr-12 pt-8 div-transition"
              onFocus={() => setFocusLeft(false)}
              item={true}
            >
              {showOrgForm && (
                <Card className="auth-form-col" style={{ margin: "0 auto" }}>
                  <Box mt={2} mb={2} m={3}>
                    <Typography>
                      <Box fontSize={16} fontWeight="fontWeightBold" m={1}>
                        <p className="mb-0 " style={{ color: textColor }}>
                          Organization Details
                        </p>
                      </Box>
                    </Typography>
                  </Box>

                  <Divider />

                  <Box m={3}>
                    <TextField
                      error={orgNameValidateError}
                      label="Organization Name"
                      variant="outlined"
                      placeholder="Organiztion Name"
                      value={orgName}
                      onChange={event => onChangeOrgName(event.target.value)}
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
                        "data-testid": "orgName",
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationCityIcon
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      error={orgHandleValidateError}
                      label="Organization Handle"
                      variant="outlined"
                      placeholder="Organiztion Handle"
                      value={orgHandle}
                      onChange={event => onChangeOrgHandle(event.target.value)}
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
                        "data-testid": "orgHandle",
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <div width="100%">
                      <TextField
                        error={orgCountryValidateError}
                        label="Organization Country"
                        variant="outlined"
                        placeholder="Organization Country"
                        value={orgCountry}
                        onChange={e => {
                          setOrgCountry(e.target.value);
                          setOrgCountrySearch(e.target.value);
                        }}
                        onFocus={() => {
                          setOrgCountrySearch(orgCountry);
                          onFocusHandle();
                        }}
                        fullWidth
                        autoComplete="orgCountry"
                        required
                        InputProps={{
                          "data-testid": "orgCountry",
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutlineIcon
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      <div>
                        {orgFilteredData.length !== 0 && (
                          <div className="dataOutput">
                            {orgFilteredData.map(item => {
                              return (
                                <div
                                  onClick={e => {
                                    setOrgCountry(item.name);
                                    setOrgCountrySearch("");
                                  }}
                                  style={{ color: textColor }}
                                >
                                  <span>{item.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </Box>

                  <Box m={3}>
                    <TextField
                      error={orgWebsiteValidateError}
                      label="Organization Website"
                      variant="outlined"
                      placeholder="Organization Website"
                      value={orgWebsite}
                      onChange={event => onChangeOrgWebsite(event.target.value)}
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
                        "data-testid": "orgWebsite",
                        startAdornment: (
                          <InputAdornment position="start">
                            <PublicIcon style={{ color: "rgba(0,0,0,.25)" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                </Card>
              )}
            </Grid>

            <Grid xs={12} className="center pl-24 pr-12 pb-32 pt-8" item={true}>
              <Button
                data-testid="submit-button"
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                disableElevation
                className="auth-form-col"
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {!showOrgForm && (
          <Grid
            xs={12}
            sm={12}
            md={showOrgForm ? 4 : 6}
            className="col-pad-24 sm-hidden 
          pl-12 pt-8" /* sm-hidden css code is writen on codelabz.css*/
            item={true}
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
        )}
      </Grid>
    </div>
  );
};

Dashboard.prototype = {
  background: PropTypes.string,
  textColor: PropTypes.string
};
export default Dashboard;
