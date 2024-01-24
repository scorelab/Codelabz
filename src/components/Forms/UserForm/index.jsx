import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  alpha,
  styled,
  Card,
  InputBase,
  InputLabel,
  TextField,
  FormControl,
  Typography,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  InputAdornment
} from "@mui/material";
import useStyles from "./styles";
import { useParams } from "react-router-dom";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserProfile,
  getUserProfileData,
  updateUserProfile
} from "../../../store/actions";
import countryList from "../../../helpers/countryList";
import {
  validateCountry,
  validateIsEmpty,
  validateName,
  validateOrgWebsite,
  validateJob,
  validateEducation
} from "../../../helpers/validations";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Input = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3)
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#fff",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow"
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));

const UserForm = () => {
  const classes = useStyles();

  const { handle } = useParams();
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getData = prop => (Boolean(prop) ? prop : "");
  const profileData = useSelector(({ firebase: { profile } }) => profile);
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
  const [job, setJob] = useState(getData(profileData.job));
  const [jobValidateError, setJobValidateError] = useState(false);
  const [jobvalidateerrormessage, setJobValidateErrorMessage] = useState("");

  const [education, setEducation] = useState(getData(profileData.education));
  const [educationValidateError, setEducationValidateError] = useState(false);
  const [educationvalidateerrormessage, setEducationValidateErrorMessage] =
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
      <MenuItem
        key={countryList[i].code}
        value={countryList[i].name}
        data-testId="selectCountryItem"
      >
        {countryList[i].name}
      </MenuItem>
    );
  }

  const onChangeName = name => setName(name);
  const onChangeCountry = country => setCountry(country);
  const onChangeOrgWebsite = website => setWebsite(website);
  const onChangeDescription = description => setDescription(description);
  const onChangeFacebook = facebook => setFacebook(facebook);
  const onChangeTwitter = twitter => setTwitter(twitter);
  const onChangeLinkedin = linkedin => setLinkedin(linkedin);
  const onChangeGithub = github => setGithub(github);
  const onChangeJob = job => setJob(job);
  const onChangeEducation = education => setEducation(education);

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
    const educationValid = validateEducation(
      education,
      setEducationValidateError,
      setEducationValidateErrorMessage
    );
    const jobValid = validateJob(
      job,
      setJobValidateError,
      setJobValidateErrorMessage
    );

    if (
      nameValid &&
      countryValid &&
      orgWebsiteValid &&
      descriptionValid &&
      jobValid &&
      educationValid
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
        job,
        education
      })(firebase, firestore, dispatch);
    }
  };

  const loadingProps = useSelector(
    ({
      profile: {
        edit: { loading }
      }
    }) => loading
  );

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  useEffect(() => {
    getUserProfileData(handle)(firebase, firestore, dispatch);
    return () => {
      clearUserProfile()(dispatch);
    };
  }, [firebase, firestore, dispatch, handle]);

  return (
    <Card className={classes.root} data-testId="profilePage">
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box>
          <FormControl
            variant="standard"
            style={{ marginRight: 25, marginBottom: 10 }}
          >
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
              error={nameValidateError}
              helperText={nameValidateError ? nameValidateErrorMessage : null}
            >
              Name
            </InputLabel>
            <Input
              value={name}
              id="bootstrap-input"
              className={classes.input}
              data-testId="name"
              onChange={event => onChangeName(event.target.value)}
              helperText={nameValidateError ? nameValidateErrorMessage : null}
            />
            <Typography className={classes.errorMessage}>
              {nameValidateErrorMessage}
            </Typography>
          </FormControl>
          <Box
            variant="standard"
            style={{ display: "inline-flex", flexDirection: "column" }}
          >
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
              error={countryValidateError}
            >
              Country of residence
            </InputLabel>
            <FormControl
              data-testId="selectCountry"
              style={{ marginTop: "3px" }}
            >
              <Select
                value={country}
                onChange={event => onChangeCountry(event.target.value)}
                input={<OutlinedInput style={{ height: 40, width: 250 }} />}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {children}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <FormControl
            variant="standard"
            style={{ marginTop: "15px", marginRight: "25px" }}
          >
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
            >
              Website
            </InputLabel>
            <Input
              value={website}
              id="bootstrap-input"
              className={classes.input}
              data-testId="website"
              onChange={event => onChangeOrgWebsite(event.target.value)}
            />
            <Typography className={classes.errorMessage}>
              {websiteValidateErrorMessage}
            </Typography>
          </FormControl>
          <FormControl variant="standard" style={{ marginTop: "13px" }}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
            >
              Description
            </InputLabel>
            <Input
              value={description}
              id="bootstrap-input"
              className={classes.input}
              data-testId="description"
              onChange={event => onChangeDescription(event.target.value)}
            />
            <Typography className={classes.errorMessage}>
              {descriptionValidateErrorMessage}
            </Typography>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            variant="standard"
            style={{ marginTop: "15px", marginRight: "25px" }}
          >
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
            >
              Job
            </InputLabel>
            <Input
              value={job}
              id="bootstrap-input"
              className={classes.input}
              data-testId=""
              job
              onChange={event => onChangeJob(event.target.value)}
            />
            <Typography className={classes.errorMessage}>
              {jobvalidateerrormessage}
            </Typography>
          </FormControl>
          <FormControl variant="standard" style={{ marginTop: "13px" }}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              style={{ color: "#000", fontSize: "20px" }}
            >
              Education
            </InputLabel>
            <Input
              value={education}
              id="bootstrap-input"
              className={classes.input}
              data-testId="education"
              onChange={event => onChangeEducation(event.target.value)}
            />
            <Typography className={classes.errorMessage}>
              {educationvalidateerrormessage}
            </Typography>
          </FormControl>
        </Box>
        <Box style={{ marginTop: 30 }}>
          <TextField
            label="Facebook"
            variant="outlined"
            placeholder="username"
            value={facebook}
            data-testId="editProfileFacebook"
            onChange={event => onChangeFacebook(event.target.value)}
            fullWidth
            autoComplete="handle"
            style={{ marginBottom: "15px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ padding: "25px 0" }}>
                  <FacebookIcon className={classes.fb}>
                    <span className="sm-text">Facebook</span>
                  </FacebookIcon>
                  <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                    facebook.com/
                  </p>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Box style={{ marginTop: 15 }}>
          <TextField
            label="Twitter"
            variant="outlined"
            value={twitter}
            placeholder="username"
            data-testId="editProfileTwitter"
            onChange={event => onChangeTwitter(event.target.value)}
            fullWidth
            autoComplete="handle"
            style={{ marginBottom: "15px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ padding: "25px 0" }}>
                  <TwitterIcon className={classes.tw}>
                    <span className="sm-text">Twitter</span>
                  </TwitterIcon>
                  <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                    twitter.com/
                  </p>
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Box style={{ marginTop: 15 }}>
          <TextField
            label="LinkedIn"
            variant="outlined"
            value={linkedin}
            data-testId="editProfileLinkedin"
            placeholder="username"
            onChange={event => onChangeLinkedin(event.target.value)}
            fullWidth
            autoComplete="handle"
            style={{ marginBottom: "15px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ padding: "25px 0" }}>
                  <LinkedInIcon className={classes.li}>
                    <span className="sm-text">Twitter</span>
                  </LinkedInIcon>
                  <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                    linkedin.com/in/
                  </p>
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Box style={{ marginTop: 15 }}>
          <TextField
            label="GitHub"
            variant="outlined"
            value={github}
            placeholder="username"
            onChange={event => onChangeGithub(event.target.value)}
            fullWidth
            data-testId="editProfileGithub"
            autoComplete="handle"
            style={{ marginBottom: "15px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ padding: "25px 0" }}>
                  <GitHubIcon className={classes.git}>
                    <span className="sm-text">Github</span>
                  </GitHubIcon>
                  <p style={{ margin: "15px 0px 15px 8px", color: "grey" }}>
                    github.com/
                  </p>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
      <Button
        fullWidth
        size="small"
        variant="contained"
        color="primary"
        style={{
          backgroundColor: "SeaGreen",
          marginTop: 15
        }}
        data-testId="editProfileSave"
        onClick={onSubmit}
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </Card>
  );
};

export default UserForm;
