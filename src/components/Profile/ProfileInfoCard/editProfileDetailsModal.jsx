import React, { useState, useEffect, useCallback } from "react";
import countryList from "../../../helpers/countryList";
import {
  validateName,
  validateCountry,
  validateOrgWebsite,
  validateIsEmpty
} from "../../../helpers/validations";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import {
  updateUserProfile,
  clearProfileEditError
} from "../../../store/actions";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/lab/Alert";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import DescriptionIcon from "@mui/icons-material/Description";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const EditProfileDetailsModal = ({ profileData, modelCloseCallback }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = prop => (Boolean(prop) ? prop : "");

  const [name, setName] = useState(getData(profileData.displayName));
  const [nameValidateError, setNameValidateError] = useState(false);
  const [nameValidateErrorMessage, setNameValidateErrorMessage] = useState("");
  const [country, setCountry] = useState(getData(profileData.country));
  const [countryValidateError, setCountryValidateError] = useState(false);
  const [website, setWebsite] = useState(getData(profileData.website));
  const [websiteValidateError, setWebsiteValidateError] = useState(false);
  const [websiteValidateErrorMessage, setWebsiteValidateErrorMessage] =
    useState("");
  const [description, setDescription] = useState(
    getData(profileData.description)
  );
  const [descriptionValidateError, setDescriptionValidateError] =
    useState(false);
  const [descriptionValidateErrorMessage, setDescriptionValidateErrorMessage] =
    useState("");
  const [facebook, setFacebook] = useState(getData(profileData.link_facebook));
  const [facebookValidateError, setFacebookValidateError] = useState(false);
  const [facebookValidateErrorMessage, setFacebookValidateErrorMessage] =
    useState("");
  const [twitter, setTwitter] = useState(getData(profileData.link_twitter));
  const [twitterValidateError, setTwitterValidateError] = useState(false);
  const [twitterValidateErrorMessage, setTwitterValidateErrorMessage] =
    useState("");
  const [linkedin, setLinkedin] = useState(getData(profileData.link_linkedin));
  const [linkedinValidateError, setLinkedinValidateError] = useState(false);
  const [linkedinValidateErrorMessage, setLinkedinValidateErrorMessage] =
    useState("");
  const [github, setGithub] = useState(getData(profileData.link_github));
  const [githubValidateError, setGithubValidateError] = useState(false);
  const [githubValidateErrorMessage, setGithubValidateErrorMessage] =
    useState("");

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
        edit: { loading }
      }
    }) => loading
  );
  const errorProps = useSelector(
    ({
      profile: {
        edit: { error }
      }
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
    const orgWebsiteValid = validateOrgWebsite(
      website,
      setWebsiteValidateError,
      setWebsiteValidateErrorMessage
    );
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
      "Please enter a Facebook username"
    );
    const twitterValid = validateIsEmpty(
      twitter,
      setTwitterValidateError,
      setTwitterValidateErrorMessage,
      "Please enter a Twitter username"
    );
    const linkedinValid = validateIsEmpty(
      linkedin,
      setLinkedinValidateError,
      setLinkedinValidateErrorMessage,
      "Please enter a LinkedIn username"
    );
    const githubValid = validateIsEmpty(
      github,
      setGithubValidateError,
      setGithubValidateErrorMessage,
      "Please enter a GitHub username"
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
        country
      })(firebase, firestore, dispatch);
    }
  };

  const onChangeName = name => setName(name);
  const onChangeCountry = country => setCountry(country);
  const onChangeOrgWebsite = website => setWebsite(website);
  const onChangeDescription = description => setDescription(description);
  const onChangeFacebook = facebook => setFacebook(facebook);
  const onChangeTwitter = twitter => setTwitter(twitter);
  const onChangeLinkedin = linkedin => setLinkedin(linkedin);
  const onChangeGithub = github => setGithub(github);

  return (
    <Grid id="editModalBox">
      {error && (
        <Grid container>
          <Grid xs={12} className="col-pad-24 pr-12 pb-0">
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          </Grid>
        </Grid>
      )}

      <Divider />

      <Box m={2}>
        <TextField
          error={nameValidateError}
          label="Display Name"
          variant="outlined"
          placeholder="Display Name"
          value={name}
          data-testId="editProfileName"
          onChange={event => onChangeName(event.target.value)}
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
            )
          }}
        />
      </Box>

      <Box m={2}>
        <FormControl variant="outlined" error={countryValidateError} fullWidth>
          <InputLabel>Country</InputLabel>
          <Select
            label="Country"
            children={children}
            style={{ width: "100%" }}
            value={country}
            onChange={event => onChangeCountry(event.target.value)}
          ></Select>
        </FormControl>
      </Box>

      <Box mt={4} mb={3} m={2}>
        <TextField
          error={websiteValidateError}
          label="Website"
          variant="outlined"
          placeholder="Website"
          value={website}
          data-testId="editProfileWebsite"
          onChange={event => onChangeOrgWebsite(event.target.value)}
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
            )
          }}
        />
      </Box>

      <Box m={2}>
        <TextField
          error={descriptionValidateError}
          label="Description"
          multiline
          variant="outlined"
          placeholder="Description"
          data-testId="editProfileDescription"
          value={description}
          onChange={event => onChangeDescription(event.target.value)}
          helperText={
            descriptionValidateError ? descriptionValidateErrorMessage : null
          }
          fullWidth
          autoComplete="description"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon style={{ color: "rgba(0,0,0,.25)" }} />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box m={2}>
        <TextField
          error={facebookValidateError}
          label="Facebook"
          variant="outlined"
          placeholder="username"
          value={facebook}
          data-testId="editProfileFacebook"
          onChange={event => onChangeFacebook(event.target.value)}
          helperText={
            facebookValidateError ? facebookValidateErrorMessage : null
          }
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FacebookIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                  facebook.com/
                </p>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box m={2}>
        <TextField
          error={twitterValidateError}
          label="Twitter"
          variant="outlined"
          value={twitter}
          placeholder="username"
          data-testId="editProfileTwitter"
          onChange={event => onChangeTwitter(event.target.value)}
          helperText={twitterValidateError ? twitterValidateErrorMessage : null}
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TwitterIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                  twitter.com/
                </p>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box m={2}>
        <TextField
          error={linkedinValidateError}
          label="LinkedIn"
          variant="outlined"
          value={linkedin}
          data-testId="editProfileLinkedin"
          placeholder="username"
          onChange={event => onChangeLinkedin(event.target.value)}
          helperText={
            linkedinValidateError ? linkedinValidateErrorMessage : null
          }
          fullWidth
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedInIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                  linkedin.com/in/
                </p>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Box m={2}>
        <TextField
          error={githubValidateError}
          label="GitHub"
          variant="outlined"
          value={github}
          placeholder="username"
          onChange={event => onChangeGithub(event.target.value)}
          helperText={githubValidateError ? githubValidateErrorMessage : null}
          fullWidth
          data-testId="editProfileGithub"
          autoComplete="handle"
          required
          style={{ marginBottom: "15px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GitHubIcon style={{ color: "rgba(0,0,0,.25)" }} />
                <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                  github.com/
                </p>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Divider />

      <Grid container direction="row-reverse">
        <Grid xs={6} md={6} lg={6} item={true}>
          <Box mt={0} mb={4} m={1}>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "SeaGreen"
              }}
              data-testId="editProfileSave"
              onClick={onSubmit}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Grid>
        <Grid xs={6} md={6} lg={6} item={true}>
          <Box mt={0} mb={4} m={1}>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "Tomato"
              }}
              onClick={closeModal}
            >
              Close
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfileDetailsModal;
