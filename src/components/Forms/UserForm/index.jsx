import React, { useCallback, useEffect, useRef, useState } from "react";
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
  updateUserProfile,
  uploadProfileImage
} from "../../../store/actions";
import countryList from "../../../helpers/countryList";
import {
  validateCountry,
  validateIsEmpty,
  validateName,
  validateOrgWebsite
} from "../../../helpers/validations";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { BasicImage, NoImage } from "../../../helpers/images";
import LinearProgress from "@mui/material/LinearProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import Divider from "@mui/material/Divider"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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

    if (nameValid && countryValid && orgWebsiteValid && descriptionValid) {
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

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      console.log("File loaded successfully:", reader.result);
      reader.addEventListener("load", () => {
        console.log("File loaded successfully:", reader.result);
        setUpImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  const base64StringToFile = (base64String, filename) => {
    let arr = base64String.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const saveImage = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }
    setShowImageDialog(false);
    uploadImage(base64StringToFile(canvas.toDataURL(), "newfile"));
  };
  const uploadImage = file => {
    setImageUploading(true);
    uploadProfileImage(file, profileData.handle)(firebase, dispatch).then(
      () => {
        setImageUploading(false);
      }
    );
    return false;
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);
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
        <Grid xs={12} md={3} lg={3} item={true}>
            <Box mt={6} mb={2} m={3}>
              {profileData.photoURL && profileData.photoURL.length > 0
                ? BasicImage(profileData.photoURL, profileData.displayName)
                : BasicImage(NoImage, "Not Available")}
              <Divider></Divider>
              {imageUploading ? (
                <LinearProgress />
              ) : (
                <Box mt={4} mb={6} m={0}>
                  <center>
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      color="primary"
                      style={{ backgroundColor: "royalblue" }}
                      id="changeProfile"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => setShowImageDialog(true)}
                    >
                      Change Profile Picture
                    </Button>
                  </center>
                </Box>
              )}

              <Dialog
                fullWidth
                maxWidth="sm"
                open={showImageDialog}
                onClose={!showImageDialog}
              >
                <DialogTitle id="alert-dialog-title">
                  <span style={{ fontSize: "1.3em", fontWeight: "480" }}>
                    {"Change Profile Picture"}
                  </span>
                </DialogTitle>
                <DialogContent>
                  <div className="App">
                    <div>
                      <Divider></Divider>
                      <Box mt={2} mb={2} m={1}>
                        <label
                          for="file-upload"
                          class="custom-file-upload"
                          style={{
                            display: "block",
                            width: "100%",
                            color: "white",
                            backgroundColor: "royalblue"
                          }}
                        >
                          <center>
                            Click here to select an image from your device
                          </center>
                        </label>
                        <input
                          id="file-upload"
                          fullWidth
                          style={{ display: "none" }}
                          accept="image/*"
                          type="file"
                          onChange={onSelectFile}
                        />
                      </Box>
                      <Divider></Divider>
                    </div>
                    <ReactCrop
                      src={upImg}
                      onImageLoaded={onLoad}
                      crop={crop}
                      onChange={c => setCrop(c)}
                      onComplete={c => setCompletedCrop(c)}
                    />
                    <div>
                      <Grid container>
                        <canvas
                          ref={previewCanvasRef}
                          style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0),
                            display: "none"
                          }}
                        />
                      </Grid>
                      <Grid container direction="row-reverse">
                        <Grid xs={6} md={6} lg={6} item={true}>
                          <Box mt={0} mb={4} m={1}>
                            <Button
                              fullWidth
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ backgroundColor: "royalblue" }}
                              onClick={() =>
                                saveImage(
                                  previewCanvasRef.current,
                                  completedCrop
                                )
                              }
                            >
                              Save
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
                              style={{ backgroundColor: "royalblue" }}
                              onClick={() => setShowImageDialog(false)}
                            >
                              Close
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </Box>
          </Grid>
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
