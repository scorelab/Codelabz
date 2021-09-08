import React, { useEffect, useState, useCallback, useRef } from "react";
import ReactCrop from "react-image-crop";
import { BasicImage, NoImage } from "../../../helpers/images";
import "react-image-crop/dist/ReactCrop.css";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinearProgress from "@material-ui/core/LinearProgress";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { useDispatch, useSelector } from "react-redux";
import EditOrgDetailsModal from "./editOrgDetailsModal";
import { unPublishOrganization, uploadOrgProfileImage } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";

const OrgInfoCard = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [orgEditModalVisible, setOrgEditModalVisible] = useState(false);
  const [currentOrgData, setCurrentOrgData] = useState(null);
  const [loading, setLoading] = useState(false);

  const orgs = useSelector(
    ({
      profile: {
        data: { organizations },
      },
    }) => organizations
  );

  const loadingProps = useSelector(
    ({
      org: {
        general: { loading },
      },
    }) => loading
  );

  const current = useSelector(
    ({
      org: {
        general: { current },
      },
    }) => current
  );

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  useEffect(() => {
    let orgDetails = orgs.find((element) => {
      return element.org_handle === current;
    });
    setCurrentOrgData(orgDetails);
  }, [current, orgs]);

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

  const uploadImage = (file) => {
    setImageUploading(true);
    uploadOrgProfileImage(
      file,
      current,
      orgs
    )(firebase, dispatch).then(() => {
      setImageUploading(false);
      window.location.reload();
    });
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

  const OrgMenu = () => {
    return (
      <Grid style={{ display: "flex", flexFlow: "row" }}>
        <Button
          fullWidth
          size="small"
          onClick={() => setOrgEditModalVisible(true)}
          id="editOrg"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "royalblue", margin: "4px" }}
        >
          Edit
        </Button>

        <Button
          fullWidth
          size="small"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "royalblue", margin: "4px" }}
          onClick={unpublishOrganization}
        >
          {currentOrgData.org_published ? <>Unpublish</> : <>Publish</>}
        </Button>
      </Grid>
    );
  };

  const DropdownMenu = () => {
    return <OrgMenu />;
  };

  const unpublishOrganization = () => {
    unPublishOrganization(current, currentOrgData.org_published, orgs)(firebase, firestore, dispatch);
  };

  if (!currentOrgData) {
    return <Card title={"Organization Details"} style={{ width: "100%" }} className="p-0" />;
  }

  return (
    <>
      <Card className="p-0" variant="outlined" loading={loading}>
        <Grid container>
          <Grid xs={12} md={12} lg={12}>
            <Typography variant="h6" style={{ margin: ".5rem" }}>
              <center>Organization Details</center>
            </Typography>
          </Grid>
          <Divider></Divider>
          <Grid xs={12} md={12} lg={12}>
            <div style={{ margin: ".5rem" }}>
              {currentOrgData.permissions && [2, 3].some((p) => currentOrgData.permissions.includes(p)) ? (
                <DropdownMenu key="more" />
              ) : null}
            </div>
          </Grid>
        </Grid>

        <Divider></Divider>
        <Grid xs={12} md={12} lg={12}>
          <Box mt={1} mb={0} m={1}>
            {currentOrgData.org_image && currentOrgData.org_image.length > 0
              ? BasicImage(currentOrgData.org_image, "name")
              : BasicImage(NoImage, "Not Available")}
            <Divider></Divider>
            {imageUploading ? (
              <LinearProgress />
            ) : (
              <div>
                {currentOrgData.permissions && currentOrgData.permissions[0] >= 2 && (
                  <Box mt={1} mb={0} m={0}>
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
                        Change Proifle Picture
                      </Button>
                    </center>
                  </Box>
                )}
              </div>
            )}
          </Box>
        </Grid>
        <Grid container>
          <Grid xs={12} md={3} lg={3} item={true}>
            <Box mt={6} mb={0} m={3}>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={showImageDialog}
                onClose={!showImageDialog}
                data-testId="changeOrgImgDialog"
              >
                <DialogTitle id="alert-dialog-title">
                  <span style={{ fontSize: "1.3em", fontWeight: "480" }}>{"Change Profile Picture"}</span>
                </DialogTitle>
                <DialogContent>
                  <div className="App">
                    <div>
                      <Divider></Divider>
                      <Box mt={2} mb={0} m={1}>
                        <label
                          for="file-upload"
                          class="custom-file-upload"
                          style={{
                            display: "block",
                            width: "100%",
                            color: "white",
                            backgroundColor: "royalBlue",
                          }}
                        >
                          <center>Click here to select an image from your device</center>
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
                          <Box mt={0} mb={0} m={1}>
                            <Button
                              fullWidth
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{ backgroundColor: "royalblue" }}
                              onClick={() => saveImage(previewCanvasRef.current, completedCrop)}
                            >
                              Save
                            </Button>
                          </Box>
                        </Grid>
                        <Grid xs={6} md={6} lg={6} item={true}>
                          <Box mt={0} mb={1} m={1}>
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
          <Grid xs={12} md={12} lg={12}>
            <Box mt={1} mb={2} m={3} id="profileData">
              <p>
                <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>{currentOrgData.org_name}</span>
              </p>
              {checkAvailable(currentOrgData.org_description) && (
                <p className="text-justified">{currentOrgData.org_description}</p>
              )}
              {checkAvailable(currentOrgData.org_link_facebook) && (
                <p>
                  <a
                    href={"https://www.facebook.com/" + currentOrgData.org_link_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="facebook-color" /> {currentOrgData.org_link_facebook}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_twitter) && (
                <p>
                  <a
                    href={"https://twitter.com/" + currentOrgData.org_link_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="twitter-color" /> {currentOrgData.org_link_twitter}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_github) && (
                <p>
                  <a
                    href={"https://github.com/" + currentOrgData.org_link_github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon className="github-color" /> {currentOrgData.org_link_github}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_linkedin) && (
                <p>
                  <a
                    href={"https://www.linkedin.com/company/" + currentOrgData.org_link_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon className="linkedin-color" /> {currentOrgData.org_link_linkedin}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_website) && (
                <p>
                  <a href={currentOrgData.org_website} target="_blank" rel="noopener noreferrer">
                    {currentOrgData.org_website}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_country) && (
                <p className="mb-0">
                  <a
                    href={"https://www.google.com/search?q=" + currentOrgData.org_country}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentOrgData.org_country}
                  </a>
                </p>
              )}
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Dialog fullWidth maxWidth="sm" open={orgEditModalVisible} onClose={!setOrgEditModalVisible} className="pt-24">
        <div style={{ margin: "2rem" }}>
          <EditOrgDetailsModal currentOrgData={currentOrgData} modelCloseCallback={(e) => setOrgEditModalVisible(e)} />
        </div>
      </Dialog>
    </>
  );
};

export default OrgInfoCard;
