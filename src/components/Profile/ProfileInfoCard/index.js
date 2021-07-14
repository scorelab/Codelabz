import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { BasicImage, NoImage } from "../../../helpers/images";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkIcon from "@material-ui/icons/Link";
import FlagIcon from "@material-ui/icons/Flag";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { useDispatch, useSelector } from "react-redux";
import EditProfileDetailsModal from "./editProfileDetailsModal";
import { uploadProfileImage } from "../../../store/actions";
import { useFirebase } from "react-redux-firebase";

const ProfileInfoCard = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [profileEditModalVisible, setProfileEditModalVisible] = useState(false);
  const profileData = useSelector(({ firebase: { profile } }) => profile);
  const [anchorEl, setAnchorEl] = useState(null);

  const [facebookURI] = useState("https://www.facebook.com/");
  const [twitterURI] = useState("https://twitter.com/");
  const [githubURI] = useState("https://github.com/");
  const [linkedinURI] = useState("https://www.linkedin.com/in/");
  const [googleURI] = useState("https://www.google.com/search?q=");

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const verified = useSelector(
    ({
      firebase: {
        auth: { emailVerified },
      },
    }) => emailVerified
  );

  const uploadImage = (file) => {
    setImageUploading(true);
    uploadProfileImage(file, profileData.handle)(firebase, dispatch).then(
      () => {
        setImageUploading(false);
      }
    );
    return false;
  };

  const checkAvailable = (data) => {
    return !!(data && data.length > 0);
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
    <div>
      <Card className="p-0" variant="outlined">
        <Box mt={2} mb={2} m={3}>
          <Grid container>
            <Grid xs={6} md={11} lg={11} item={true}>
              <span style={{ fontSize: "1.3em", fontWeight: "480" }}>
                Profile Details
              </span>
            </Grid>
            <Grid xs={6} md={1} lg={1} item={true}>
              <div>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <SettingsOutlinedIcon /> Options
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => setProfileEditModalVisible(true)}>
                    Edit Profile
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Divider></Divider>
        <Grid container>
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
                      style={{
                        backgroundColor: "#455a64",
                      }}
                      startIcon={<CloudUploadIcon />}
                      onClick={() => setShowImageDialog(true)}
                    >
                      Change Proifle Picture
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
                            backgroundColor: "#455a64",
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
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                    />
                    <div>
                      <Grid container>
                        <canvas
                          ref={previewCanvasRef}
                          style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0),
                            display: "none",
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
                              style={{
                                backgroundColor: "SeaGreen",
                              }}
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
                              style={{
                                backgroundColor: "Tomato",
                              }}
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
          <Grid xs={12} md={9} lg={9} item={true}>
            <Box mt={6} mb={2} m={3}>
              <p>
                <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                  {profileData.displayName}
                  <Box>
                    {verified ? (
                      <Chip
                        size="small"
                        icon={<CheckCircleIcon />}
                        label="Email Verified"
                        color="primary"
                        style={{ backgroundColor: "LimeGreen" }}
                      />
                    ) : (
                      <Chip
                        size="small"
                        icon={<CancelIcon />}
                        label="Email not verified"
                        color="secondary"
                      />
                    )}
                  </Box>
                </span>
              </p>
              <Box mr={12}>
                {checkAvailable(profileData.description) && (
                  <p className="text-justified">{profileData.description}</p>
                )}
              </Box>

              {checkAvailable(profileData.link_facebook) && (
                <p>
                  <a
                    href={facebookURI.concat(profileData.link_facebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Box mr={1}>
                        <FacebookIcon
                          fontSize="small"
                          className="facebook-color"
                        />
                      </Box>{" "}
                      {profileData.link_facebook}
                    </div>
                  </a>
                </p>
              )}
              {checkAvailable(profileData.link_twitter) && (
                <p>
                  <a
                    href={twitterURI.concat(profileData.link_twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Box mr={1}>
                        <TwitterIcon
                          fontSize="small"
                          className="twitter-color"
                        />{" "}
                      </Box>
                      {profileData.link_twitter}
                    </div>
                  </a>
                </p>
              )}
              {checkAvailable(profileData.link_github) && (
                <p>
                  <a
                    href={githubURI.concat(profileData.link_github)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Box mr={1}>
                        <GitHubIcon fontSize="small" className="github-color" />{" "}
                      </Box>
                      {profileData.link_github}
                    </div>
                  </a>
                </p>
              )}
              {checkAvailable(profileData.link_linkedin) && (
                <p>
                  <a
                    href={linkedinURI.concat(profileData.link_linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Box mr={1}>
                        <LinkedInIcon
                          fontSize="small"
                          className="linkedin-color"
                        />
                      </Box>{" "}
                      {profileData.link_linkedin}
                    </div>
                  </a>
                </p>
              )}
              {checkAvailable(profileData.website) && (
                <p>
                  <a
                    href={profileData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Box mr={1}>
                        <LinkIcon fontSize="small" className="website-color" />
                      </Box>{" "}
                      {profileData.website}
                    </div>
                  </a>
                </p>
              )}
              {checkAvailable(profileData.country) && (
                <p className="mb-0">
                  <a
                    href={googleURI.concat(profileData.country)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Box mr={1}>
                        <FlagIcon fontSize="small" className="website-color" />{" "}
                      </Box>
                      {profileData.country}
                    </div>
                  </a>
                </p>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        fullWidth
        maxWidth="md"
        open={profileEditModalVisible}
        onClose={!profileEditModalVisible}
      >
        <DialogTitle id="alert-dialog-title">
          <span style={{ fontSize: "1.3em", fontWeight: "480" }}>
            {"Edit Profile"}
          </span>
        </DialogTitle>
        <DialogContent>
          <EditProfileDetailsModal
            profileData={profileData}
            modelCloseCallback={(e) => setProfileEditModalVisible(e)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileInfoCard;
