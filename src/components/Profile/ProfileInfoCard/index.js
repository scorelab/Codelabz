import React, { useState } from "react";
import { Upload } from "antd";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

import noImageAvailable from "../../../assets/images/no-image-available.svg";

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
import Input from "@material-ui/core/Input";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkIcon from "@material-ui/icons/Link";
import FlagIcon from "@material-ui/icons/Flag";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import { useDispatch, useSelector } from "react-redux";
import ImgCrop from "antd-img-crop";
import EditProfileDetailsModal from "./editProfileDetailsModal";
import { uploadProfileImage } from "../../../store/actions";
import { useFirebase } from "react-redux-firebase";

const { Dragger } = Upload;

const ProfileInfoCard = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [showImageDialog, setShowImageDialog] = useState(false);

  const [imageUploading, setImageUploading] = useState(false);
  const [profileEditModalVisible, setProfileEditModalVisible] = useState(false);

  const profileData = useSelector(({ firebase: { profile } }) => profile);

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const DropdownMenu = () => {
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <SettingsOutlinedIcon /> Options
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => setProfileEditModalVisible(true)}>Edit Profile</MenuItem>
        </Menu>
      </div>
    );
  };

  const uploadImage = (file) => {
    setImageUploading(true);
    uploadProfileImage(file, profileData.handle)(firebase, dispatch).then(() => {
      setImageUploading(false);
    });
    return false;
  };

  const checkAvailable = (data) => {
    return !!(data && data.length > 0);
  };

  const onChangeImage = (file) => setImage(file);

  return (
    <>
      <Card className="p-0">
        <DropdownMenu />
        <Box mt={2} mb={2} m={3}>
          <Grid container>
            <span style={{ fontSize: "1.3em", fontWeight: "480" }}>Profile Details</span>
          </Grid>
        </Box>
        <Grid container>
          <Grid xs={12} md={3} lg={3} item={true}>
            <Box mt={2} mb={2} m={3}>
              {profileData.photoURL && profileData.photoURL.length > 0 ? (
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                  src={profileData.photoURL}
                  alt={profileData.displayName}
                  className="org-image"
                />
              ) : (
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                  src={noImageAvailable}
                  alt={"Not Available"}
                  className="org-image"
                />
              )}
              {/* uploadImage(file) */}

              <ImgCrop rotate>
                <Dragger beforeUpload={uploadImage} className="mt-16">
                  {imageUploading ? (
                    <>
                      <LoadingOutlined /> Please wait...
                      <p className="ant-upload-hint mt-8">Uploading image...</p>
                    </>
                  ) : (
                    <>
                      <CameraOutlined /> Change image
                      <p className="ant-upload-hint mt-8">Click or drag your image here</p>
                    </>
                  )}
                </Dragger>
              </ImgCrop>

              {/* safe space */}
              {/* <Input
                type="file"
                onChange={(event) => onChangeImage(URL.createObjectURL(event.target.files[0]))}
                inputProps={{ accept: "image/*" }}
              />
              {image ? (
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                  src={image}
                  alt={profileData.displayName}
                  className="org-image"
                />
              ) : null} */}
              <Button onClick={() => setShowImageDialog(true)}>Upload a New Image</Button>
              <Dialog fullWidth="md" maxWidth="md" open={showImageDialog} onClose={!showImageDialog}>
                <DialogTitle id="alert-dialog-title">{"Upload a New Image"}</DialogTitle>
                <DialogContent>
                  <Button onClick={() => setShowImageDialog(false)}>Close</Button>
                </DialogContent>
              </Dialog>

              {/* safe space end */}
            </Box>
          </Grid>
          <Grid xs={12} md={9} lg={9} item={true}>
            <p>
              <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>{profileData.displayName}</span>
              {verified ? (
                <Chip size="small" icon={<CheckCircleIcon />} label="Email Verified" color="primary" />
              ) : (
                <Chip size="small" icon={<CancelIcon />} label="Email not verified" color="secondary" />
              )}
            </p>
            {checkAvailable(profileData.description) && <p className="text-justified">{profileData.description}</p>}
            {checkAvailable(profileData.link_facebook) && (
              <p>
                <a href={"https://www.facebook.com/" + profileData.link_facebook} target="_blank" rel="noopener noreferrer">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <FacebookIcon fontSize="small" className="facebook-color" /> {profileData.link_facebook}
                  </div>
                </a>
              </p>
            )}
            {checkAvailable(profileData.link_twitter) && (
              <p>
                <a href={"https://twitter.com/" + profileData.link_twitter} target="_blank" rel="noopener noreferrer">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <TwitterIcon fontSize="small" className="twitter-color" /> {profileData.link_twitter}
                  </div>
                </a>
              </p>
            )}
            {checkAvailable(profileData.link_github) && (
              <p>
                <a href={"https://github.com/" + profileData.link_github} target="_blank" rel="noopener noreferrer">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <GitHubIcon fontSize="small" className="github-color" /> {profileData.link_github}
                  </div>
                </a>
              </p>
            )}
            {checkAvailable(profileData.link_linkedin) && (
              <p>
                <a href={"https://www.linkedin.com/in/" + profileData.link_linkedin} target="_blank" rel="noopener noreferrer">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <LinkedInIcon fontSize="small" className="linkedin-color" /> {profileData.link_linkedin}
                  </div>
                </a>
              </p>
            )}
            {checkAvailable(profileData.website) && (
              <p>
                <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <LinkIcon fontSize="small" className="website-color" /> {profileData.website}
                  </div>
                </a>
              </p>
            )}
            {checkAvailable(profileData.country) && (
              <p className="mb-0">
                <a href={"https://www.google.com/search?q=" + profileData.country} target="_blank" rel="noopener noreferrer">
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <FlagIcon fontSize="small" className="website-color" /> {profileData.country}
                  </div>
                </a>
              </p>
            )}
          </Grid>
        </Grid>
      </Card>
      <Dialog fullWidth="md" maxWidth="md" open={profileEditModalVisible} onClose={() => setProfileEditModalVisible(false)}>
        <DialogTitle id="alert-dialog-title">{"Edit Profile"}</DialogTitle>
        <DialogContent>
          <EditProfileDetailsModal profileData={profileData} modelCloseCallback={(e) => setProfileEditModalVisible(e)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileInfoCard;
