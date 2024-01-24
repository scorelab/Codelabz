import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

const RemoveStepModal = ({
  owner,
  tutorial_id,
  step_id,
  viewModal,
  currentStep,
  step_length
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const handleOnOk = event => {
    setSnackbarOpen(true);
    setSnackbarMessage("Updating....");
    if (step_length > 1) {
      event.preventDefault();
      removeStep(
        owner,
        tutorial_id,
        step_id,
        currentStep
      )(firebase, firestore, dispatch).then(() => {
        setVisible(false);
        setSnackbarOpen(true);
        setSnackbarMessage("Removed....");
      });
    }
  };
  const handleOnCancel = () => setVisible(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };
  return (
    <>
      <Modal
        open={visible}
        onClose={handleOnCancel}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          border: "2px solid #000",
          background: "whitesmoke",
          boxShadow: "2rem gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "10rem",
          width: "20rem",
          position: "absolute",
          top: "40%",
          left: "40%"
        }}
      >
        <div>
          <Typography>This action is can not be undone!</Typography>
          <form onSubmit={handleOnOk}>
            <Button key="back" onClick={handleOnCancel}>
              <Typography>Cancel</Typography>
            </Button>
            <Button key="remove" type="submit">
              <Typography> Remove</Typography>
            </Button>
          </form>
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default RemoveStepModal;
