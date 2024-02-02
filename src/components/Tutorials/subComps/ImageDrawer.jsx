import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTutorialImagesReducer,
  remoteTutorialImages,
  uploadTutorialImages
} from "../../../store/actions";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ImageDrawer = ({ onClose, visible, owner, tutorial_id, imageURLs }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const uploading = useSelector(
    ({
      tutorials: {
        images: { uploading }
      }
    }) => uploading
  );

  const uploading_error = useSelector(
    ({
      tutorials: {
        images: { uploading_error }
      }
    }) => uploading_error
  );

  const deleting = useSelector(
    ({
      tutorials: {
        images: { deleting }
      }
    }) => deleting
  );

  const deleting_error = useSelector(
    ({
      tutorials: {
        images: { deleting_error }
      }
    }) => deleting_error
  );

  const [uploadSnackbarOpen, setUploadSnackbarOpen] = React.useState(false);
  const [uploadErrorSnackbarOpen, setUploadErrorSnackbarOpen] =
    React.useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = React.useState(false);
  const [deleteErrorSnackbarOpen, setDeleteErrorSnackbarOpen] =
    React.useState(false);

  useEffect(() => {
    if (uploading === false && uploading_error === false) {
      setUploadSnackbarOpen(true);
    } else if (uploading === false && uploading_error) {
      setUploadErrorSnackbarOpen(true);
    }
  }, [uploading, uploading_error]);

  useEffect(() => {
    if (deleting === false && deleting_error === false) {
      setDeleteSnackbarOpen(true);
    } else if (deleting === false && deleting_error) {
      setDeleteErrorSnackbarOpen(true);
    }
  }, [deleting, deleting_error]);

  const handleSnackbarClose = type => {
    switch (type) {
      case "upload":
        setUploadSnackbarOpen(false);
        setUploadErrorSnackbarOpen(false);
        break;
      case "delete":
        setDeleteSnackbarOpen(false);
        setDeleteErrorSnackbarOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    clearTutorialImagesReducer()(dispatch);
    return () => {
      clearTutorialImagesReducer()(dispatch);
    };
  }, [dispatch]);

  const beforeUpload = async files => {
    console.log("Image Upload Started!!!")
    await uploadTutorialImages(owner, tutorial_id, files)(
      firebase,
      firestore,
      dispatch
    );
    console.log("Uploaded the Images");
    return false;
  };

  const deleteFile = (name, url) =>
    remoteTutorialImages(
      owner,
      tutorial_id,
      name,
      url
    )(firebase, firestore, dispatch);

  return (
    <>
      <Drawer
        title="Images"
        data-testid="imageDrawer"
        anchor="right"
        closable={true}
        onClose={onClose}
        open={visible}
        getContainer={true}
        style={{ position: "absolute" }}
        width="400px"
        className="image-drawer"
        destroyOnClose={true}
        maskClosable={false}
      >
        <div className="col-pad-24" data-testId="tutorialImgUpload">
          <Grid>
            <input
              id="file-upload"
              fullWidth
              accept="image/*"
              type="file"
              name="file"
              multiple
              onChange={event => beforeUpload(event.target.files)}
            />
            {uploading ? (
              <>
                <LoadingOutlined /> Please wait...
                <p className="ant-upload-hint mt-8">Uploading image(s)...</p>
              </>
            ) : (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag images to here to upload
                </p>
              </>
            )}
          </Grid>
          {imageURLs &&
            imageURLs.length > 0 &&
            imageURLs.map((image, i) => (
              <Grid className="mb-24" key={i}>
                <Grid xs={24} md={8}>
                  <img src={image.url} alt="" />
                </Grid>
                <Grid xs={24} md={16} className="pl-8" style={{}}>
                  <h4 className="pb-8">{image.name}</h4>

                  <CopyToClipboard
                    text={`![alt=image; scale=1.0](${image.url})`}
                    onCopy={() => (
                      <Snackbar
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left"
                        }}
                        open={true}
                        autoHideDuration={6000}
                        message="Copied...."
                      />
                    )}
                  >
                    <Button type="primary">Copy URL</Button>
                  </CopyToClipboard>

                  <Button
                    loading={deleting}
                    onClick={() => deleteFile(image.name, image.url)}
                    type="ghost"
                    danger
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))}
        </div>
      </Drawer>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={uploadSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => handleSnackbarClose("upload")}
        message="Image Uploaded successfully...."
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={uploadErrorSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => handleSnackbarClose("upload")}
        message={uploading_error}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={deleteSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => handleSnackbarClose("delete")}
        message="Deleted Successfully...."
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={deleteErrorSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => handleSnackbarClose("delete")}
        message={deleting_error}
      />
    </>
  );
};

export default ImageDrawer;
