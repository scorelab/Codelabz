import React, { useEffect, useState, useCallback, useRef } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ReactCrop from "react-image-crop";
import Divider from "@mui/material/Divider";
import "react-image-crop/dist/ReactCrop.css";
import { BasicImage, NoImage } from "../../../helpers/images";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import EditOrgDetailsModal from "./editOrgDetailsModal";
import {
  clearEditGeneral,
  unPublishOrganization,
  uploadOrgProfileImage
} from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import useStyles from "./styles";

const OrgInfoCard = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [currentOrgData, setCurrentOrgData] = useState({});
  const [orgEditModalVisible, setOrgEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
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

  const OrgMenu = () => {
    return (
      <Grid style={{ display: "flex", flexFlow: "row" }}>
        <Button
          onClick={() => setOrgEditModalVisible(true)}
          id="editOrg"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "royalblue", margin: "4px" }}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "royalblue", margin: "4px" }}
          onClick={_unpublishOrganization}
        >
          {currentOrgData.org_published ? <>Unpublish</> : <>Publish</>}
        </Button>
      </Grid>
    );
  };

  const DropdownMenu = () => {
    return <OrgMenu />;
  };

  const loadingProps = useSelector(
    ({
      org: {
        general: { loading }
      }
    }) => loading
  );

  const current = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  useEffect(() => {
    setLoading(loadingProps);
  }, [loadingProps]);

  const orgs = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  useEffect(() => {
    let orgDetails = orgs.find(element => {
      return element.org_handle === current;
    });
    setCurrentOrgData(orgDetails);
  }, [current, orgs]);

  const uploadImage = file => {
    uploadOrgProfileImage(
      file,
      current,
      orgs
    )(firebase, dispatch).then(() => {
      clearEditGeneral()(dispatch);
    });
    return false;
  };

  const checkAvailable = data => {
    return !!(data && data.length > 0);
  };

  const _unpublishOrganization = () => {
    unPublishOrganization(current, currentOrgData.org_published, orgs)(
      firebase,
      firestore,
      dispatch
    );
  };

  if (currentOrgData) {
    return (
      <>
        <Card loading={loading}>
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" style={{ margin: ".5rem" }}>
              Organization Details
            </Typography>
            <div style={{ margin: ".5rem" }}>
              {currentOrgData.permissions &&
              [2, 3].some(p => currentOrgData.permissions.includes(p)) ? (
                <DropdownMenu key="more" />
              ) : null}
            </div>
          </Grid>
          <Grid className={classes.root}>
            <Grid md={8} lg={8}>
              <Card
                style={{
                  width: "100%"
                }}
                bordered={false}
                className="org-image-card"
              >
                {currentOrgData.org_image
                  ? BasicImage(currentOrgData.org_image, "name")
                  : BasicImage(NoImage, "Not Available")}
                {currentOrgData.permissions &&
                  currentOrgData.permissions[0] >= 2 && (
                    <Box mt={4} mb={1} m={0}>
                      <center>
                        <Button
                          fullWidth
                          size="small"
                          variant="contained"
                          color="primary"
                          style={{ backgroundColor: "royalblue" }}
                          id="changeOrgImg"
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
                  data-testId="changeOrgImgDialog"
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
                              backgroundColor: "royalBlue"
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
              </Card>
            </Grid>
            <Grid
              xs={24}
              md={16}
              lg={16}
              className="pl-24-d pt-24-m"
              data-testId="orgInfoCard"
            >
              <p>
                <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                  {currentOrgData.org_name}
                </span>
              </p>
              {checkAvailable(currentOrgData.org_description) && (
                <p className="text-justified">
                  {currentOrgData.org_description}
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_facebook) && (
                <p>
                  <a
                    href={
                      "https://www.facebook.com/" +
                      currentOrgData.org_link_facebook
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="facebook-color" />{" "}
                    {currentOrgData.org_link_facebook}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_twitter) && (
                <p>
                  <a
                    href={
                      "https://twitter.com/" + currentOrgData.org_link_twitter
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="twitter-color" />{" "}
                    {currentOrgData.org_link_twitter}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_github) && (
                <p>
                  <a
                    href={
                      "https://github.com/" + currentOrgData.org_link_github
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon className="github-color" />{" "}
                    {currentOrgData.org_link_github}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_link_linkedin) && (
                <p>
                  <a
                    href={
                      "https://www.linkedin.com/company/" +
                      currentOrgData.org_link_linkedin
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon className="linkedin-color" />{" "}
                    {currentOrgData.org_link_linkedin}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_website) && (
                <p>
                  <a
                    href={currentOrgData.org_website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentOrgData.org_website}
                  </a>
                </p>
              )}
              {checkAvailable(currentOrgData.org_country) && (
                <p className="mb-0">
                  <a
                    href={
                      "https://www.google.com/search?q=" +
                      currentOrgData.org_country
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {currentOrgData.org_country}
                  </a>
                </p>
              )}
            </Grid>
          </Grid>
        </Card>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={orgEditModalVisible}
          onClose={!setOrgEditModalVisible}
          className="pt-24"
        >
          <div style={{ margin: "2rem" }}>
            <EditOrgDetailsModal
              currentOrgData={currentOrgData}
              modelCloseCallback={e => setOrgEditModalVisible(e)}
            />
          </div>
        </Dialog>
      </>
    );
  } else {
    return (
      <Card
        loading={loading}
        title={"Organization Details"}
        style={{ width: "100%" }}
        className="p-0"
      />
    );
  }
};

export default OrgInfoCard;
