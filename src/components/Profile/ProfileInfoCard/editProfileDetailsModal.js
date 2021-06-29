import React, { useState, useEffect, useCallback } from "react";
import countryList from "../../../helpers/countryList";
import { validateName, validateCountry, validateOrgWebsite, validateIsEmpty } from "../../../helpers/validations";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@material-ui/lab/Alert";
import PersonIcon from "@material-ui/icons/Person";
import PublicIcon from "@material-ui/icons/Public";

import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { updateUserProfile, clearProfileEditError } from "../../../store/actions";

const EditProfileDetailsModal = ({ profileData, modelCloseCallback }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = (prop) => (Boolean(prop) ? prop : "");

  const [name, setName] = useState(getData(profileData.displayName));
  const [nameValidateError, setNameValidateError] = useState(false);
  const [nameValidateErrorMessage, setNameValidateErrorMessage] = useState("");
  const [country, setCountry] = useState(getData(profileData.country));
  const [countryValidateError, setCountryValidateError] = useState(false);
  const [website, setWebsite] = useState(getData(profileData.website));
  const [websiteValidateError, setWebsiteValidateError] = useState(false);
  const [websiteValidateErrorMessage, setWebsiteValidateErrorMessage] = useState("");
  const [description, setDescription] = useState(getData(profileData.description));
  const [descriptionValidateError, setDescriptionValidateError] = useState(false);
  const [descriptionValidateErrorMessage, setDescriptionValidateErrorMessage] = useState("");
  const [facebook, setFacebook] = useState(getData(profileData.link_facebook));
  const [facebookValidateError, setFacebookValidateError] = useState(false);
  const [facebookValidateErrorMessage, setFacebookValidateErrorMessage] = useState("");
  const [twitter, setTwitter] = useState(getData(profileData.link_twitter));
  const [twitterValidateError, setTwitterValidateError] = useState(false);
  const [twitterValidateErrorMessage, setTwitterValidateErrorMessage] = useState("");
  const [linkedin, setLinkedin] = useState(getData(profileData.link_linkedin));
  const [linkedinValidateError, setLinkedinValidateError] = useState(false);
  const [linkedinValidateErrorMessage, setLinkedinValidateErrorMessage] = useState("");
  const [github, setGithub] = useState(getData(profileData.link_github));
  const [githubValidateError, setGithubValidateError] = useState(false);
  const [githubValidateErrorMessage, setGithubValidateErrorMessage] = useState("");

  const children = [];

  for (let i = 0; i < countryList.length; i++) {
    children.push(
      <MenuItem key={countryList[i].code} value={countryList[i].name}>
        {countryList[i].name}
      </MenuItem>
    );
  }

  const loadingProps = useSelector(
    ({
      profile: {
        edit: { loading },
      },
    }) => loading
  );
  const errorProps = useSelector(
    ({
      profile: {
        edit: { error },
      },
    }) => error
  );

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  useEffect(() => {
    setError(errorProps);
  }, [errorProps]);

  const closeModal = useCallback(() => {
    modelCloseCallback(false);
    clearProfileEditError()(dispatch);
  }, [modelCloseCallback, dispatch]);

  useEffect(() => {
    if (loading === false && error === false) {
      closeModal();
    }
  }, [closeModal, loading, error]);

  const validated = () => {
    const countryValid = validateCountry(country, setCountryValidateError);
    const orgWebsiteValid = validateOrgWebsite(website, setWebsiteValidateError, setWebsiteValidateErrorMessage);
    const nameValid = validateName(
      name,
      setNameValidateError,
      setNameValidateErrorMessage,
      "Please enter your name",
      "Please enter a real name"
    );
    const descriptionValid = validateIsEmpty(
      description,
      setDescriptionValidateError,
      setDescriptionValidateErrorMessage,
      "Please enter a description"
    );
    const facebookValid = validateIsEmpty(
      facebook,
      setFacebookValidateError,
      setFacebookValidateErrorMessage,
      "Please enter a facebook username"
    );
    const twitterValid = validateIsEmpty(
      twitter,
      setTwitterValidateError,
      setTwitterValidateErrorMessage,
      "Please enter a twitter username"
    );
    const linkedinValid = validateIsEmpty(
      linkedin,
      setLinkedinValidateError,
      setLinkedinValidateErrorMessage,
      "Please enter a linkedin username"
    );
    const githubValid = validateIsEmpty(
      github,
      setGithubValidateError,
      setGithubValidateErrorMessage,
      "Please enter a github username"
    );
    if (
      nameValid &&
      countryValid &&
      orgWebsiteValid &&
      descriptionValid &&
      facebookValid &&
      twitterValid &&
      githubValid &&
      linkedinValid
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = () => {
    if (validated()) {
      updateUserProfile({
        displayName: name,
        website,
        link_facebook: facebook,
        link_github: github,
        link_linkedin: linkedin,
        link_twitter: twitter,
        description,
        country,
      })(firebase, firestore, dispatch);
    }
  };

  const onChangeName = (name) => setName(name);
  const onChangeCountry = (country) => setCountry(country);
  const onChangeOrgWebsite = (website) => setWebsite(website);
  const onChangeDescription = (description) => setDescription(description);
  const onChangeFacebook = (facebook) => setFacebook(facebook);
  const onChangeTwitter = (twitter) => setTwitter(twitter);
  const onChangeLinkedin = (linkedin) => setLinkedin(linkedin);
  const onChangeGithub = (github) => setGithub(github);
  return (
    <>
      {error && (
        <Grid container>
          <Grid xs={12} className="col-pad-24 pr-12 pb-0">
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          </Grid>
        </Grid>
      )}

      {/* start */}
      <Divider />
      <Box m={3}>
        <TextField
          error={nameValidateError}
          label="Name"
          variant="outlined"
          placeholder="Name"
          value={name}
          onChange={(event) => onChangeName(event.target.value)}
          helperText={nameValidateError ? nameValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" error={countryValidateError} fullWidth>
          <InputLabel>User Country</InputLabel>
          <Select
            label="User Country"
            children={children}
            style={{ width: "100%" }}
            value={country}
            onChange={(event) => onChangeCountry(event.target.value)}
          ></Select>
        </FormControl>

        <TextField
          error={websiteValidateError}
          label="Organization Website"
          variant="outlined"
          placeholder="Organization Website"
          value={website}
          onChange={(event) => onChangeOrgWebsite(event.target.value)}
          helperText={websiteValidateError ? websiteValidateErrorMessage : null}
          fullWidth
          autoComplete="orgWebsite"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={descriptionValidateError}
          label="description"
          multiline
          variant="outlined"
          placeholder="description"
          value={description}
          onChange={(event) => onChangeDescription(event.target.value)}
          helperText={descriptionValidateError ? descriptionValidateErrorMessage : null}
          fullWidth
          autoComplete="description"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={facebookValidateError}
          label="facebook"
          variant="outlined"
          placeholder="username"
          value={facebook}
          onChange={(event) => onChangeFacebook(event.target.value)}
          helperText={facebookValidateError ? facebookValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>facebook.com/</p>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={twitterValidateError}
          label="twitter"
          variant="outlined"
          value={twitter}
          placeholder="username"
          onChange={(event) => onChangeTwitter(event.target.value)}
          helperText={twitterValidateError ? twitterValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>twitter.com/</p>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={linkedinValidateError}
          label="linkedin"
          variant="outlined"
          value={linkedin}
          placeholder="username"
          onChange={(event) => onChangeLinkedin(event.target.value)}
          helperText={linkedinValidateError ? linkedinValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>linkedin.com/in/</p>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          error={githubValidateError}
          label="github"
          variant="outlined"
          value={github}
          placeholder="username"
          onChange={(event) => onChangeGithub(event.target.value)}
          helperText={githubValidateError ? githubValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>github.com/</p>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Divider></Divider>
      {/* end */}

      <Button onClick={closeModal}>Cancel</Button>
      <Button
        size="small"
        fullWidth
        variant="contained"
        color="primary"
        style={{
          backgroundColor: "#455a64",
        }}
        className="auth-form-col"
        onClick={onSubmit}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </>
  );
};

export default EditProfileDetailsModal;
