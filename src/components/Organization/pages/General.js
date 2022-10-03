import React, { useCallback, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  InputBase,
  Button,
  Fab,
  Avatar,
  CircularProgress
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import OrgDelete from "../OrgUsers/OrgDelete";
import { useDispatch, useSelector } from "react-redux";
import { BasicImage, NoImage } from "../../../helpers/images";
import {
  uploadOrgProfileImage,
  clearEditGeneral,
  editGeneralData
} from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import ChangeProfile from "../../Profile/ChangeProfile/ChangeProfile";
import { useDebouncedEffect } from "../../../helpers/customHooks/useDebounce";

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    [theme.breakpoints.down("md")]: {
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "99%"
    },
    marginTop: "20px"
  },
  save: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 20,
    flex: 1
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 100
  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "90%"
  },
  input2: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "100%"
  },
  button: {
    boxShadow: "none",
    borderRadius: "25px",
    border: 0,
    backgroundColor: theme.palette.grey[200],
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`
  },
  hashbutton: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    padding: 5,
    [theme.breakpoints.down("md")]: {
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      width: "99%"
    }
  },
  hashtag: {
    boxShadow: "none",
    borderRadius: "25px",
    border: 0,
    direction: "column",
    backgroundColor: theme.palette.grey[200],
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`
  },
  ProfilePhotoImage: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  ProfileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  LoadingData: {
    opacity: 0.5,
    fontStyle: "italic",
    fontSize: "0.8rem"
  }
}));

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

/**
 * @description - This component is used to edit the general details of the organization.
 * @returns {React.Component}
 */
function General() {
  const classes = useStyles();

  // Image Uploading And Cropping Hooks
  const [imageUploading, setImageUploading] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  // Firebase Hooks
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const CurrentOrg = useSelector(
    ({
      profile: {
        data: { organizations }
      },
      org: {
        general: { current }
      }
    }) => organizations.find(element => element.org_handle === current)
  );

  const profileOrganizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  // State Hooks
  const [isUpdating, setIsUpdating] = useState(false);
  const [OrgData, setOrgData] = useState(CurrentOrg);
  useDebouncedEffect(
    () => {
      EditOrg();
    },
    [OrgData],
    2000
  );

  const handleChange = name => event => {
    setOrgData({ ...OrgData, [name]: event.target.value });
  };

  const saveImage = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }
    setShowImageDialog(false);
    uploadImage(base64StringToFile(canvas.toDataURL(), "newfile"));
  };

  const uploadImage = file => {
    setIsUpdating(true);
    uploadOrgProfileImage(
      file,
      CurrentOrg.org_handle,
      CurrentOrg
    )(firebase, dispatch).then(() => {
      setIsUpdating(false);
      setImageUploading(false);
      clearEditGeneral()(dispatch);
    });
    return false;
  };

  const EditOrg = useCallback(() => {
    setIsUpdating(true);
    editGeneralData(
      {
        ...OrgData,
        org_handle: CurrentOrg.org_handle,
        org_image: CurrentOrg.org_image
      },
      profileOrganizations
    )(firebase, firestore, dispatch).then(() => {
      setIsUpdating(false);
    });
  }, [
    profileOrganizations,
    OrgData,
    dispatch,
    firebase,
    firestore,
    CurrentOrg
  ]);

  return (
    <React.Fragment>
      <div data-testid="organization-general-page">
        <Grid item container spacing={6} alignItems="center">
          <Grid item>
            <Typography className={classes.heading}>General</Typography>
          </Grid>
          <Grid item container xs={4} spacing={2}>
            {isUpdating ? (
              <React.Fragment>
                <Grid item>
                  <CircularProgress
                    style={{
                      color: "black"
                    }}
                    size={16}
                    className={classes.LoadingData}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.LoadingData}>
                    Updating Info...
                  </Typography>
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item>
                <Typography className={classes.LoadingData}>
                  Data Updated
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <div className={classes.root}>
          <Grid item container spacing={2}>
            <Grid item xs={6}>
              <Typography>Organization Name</Typography>
              <InputBase
                className={classes.input}
                placeholder="Organization Name"
                value={OrgData.org_name}
                onChange={handleChange("org_name")}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Organization Handle</Typography>
              <InputBase
                className={classes.input}
                placeholder="Organization Handle"
                disabled
                value={OrgData.org_handle}
                onChange={handleChange("org_handle")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Website URL</Typography>
              <InputBase
                className={classes.input}
                placeholder="https://Website URL"
                value={OrgData.org_website}
                onChange={handleChange("org_website")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Profile Image</Typography>
              <Grid container direction="column">
                <Grid item container alignItems="center">
                  <Grid item xs={2} className={classes.ProfileContainer}>
                    {CurrentOrg.org_image ? (
                      <Avatar
                        src={CurrentOrg.org_image}
                        className={classes.ProfilePhotoImage}
                      />
                    ) : (
                      BasicImage(NoImage, "Not Available")
                    )}
                  </Grid>

                  <Grid item>
                    {imageUploading ? (
                      <LinearProgress />
                    ) : (
                      <Box mt={4} mb={6} m={0}>
                        <center>
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.ProfilePhoto}
                            startIcon={<CloudUploadIcon />}
                            onClick={() => setShowImageDialog(true)}
                          >
                            Choose File
                          </Button>
                        </center>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          <Grid item xs={6}>
            <CardContent>
              <Typography>Brief description</Typography>
              <div>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  rows={4}
                  fullWidth={true}
                  variant="filled"
                  value={OrgData.org_description}
                  onChange={handleChange("org_description")}
                />
              </div>
              <Typography>Select tags</Typography>
              <Grid item xs={16} className={classes.hashbutton}>
                <Button color="grey" className={classes.hashtag} disableRipple>
                  #python
                </Button>
                <Button color="grey" className={classes.hashtag} disableRipple>
                  #javascript
                </Button>
                <Fab size="small" color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </Grid>
            </CardContent>
          </Grid>
        </div>
        <Grid className={classes.root}>
          <OrgDelete />
        </Grid>
      </div>
      <ChangeProfile
        saveImage={saveImage}
        open={showImageDialog}
        onClose={() => setShowImageDialog(false)}
      />
    </React.Fragment>
  );
}

export default General;
