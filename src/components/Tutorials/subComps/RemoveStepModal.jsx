import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
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

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const handleOnOk = event => {
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={true}
      autoHideDuration={6000}
      message="Updating...."
    />;
    if (step_length > 1) {
      event.preventDefault();
      removeStep(
        owner,
        tutorial_id,
        step_id,
        currentStep
      )(firebase, firestore, dispatch).then(() => {
        setVisible(false);
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={true}
          autoHideDuration={6000}
          message="removed...."
        />;
      });
    }
  };
  const handleOnCancel = () => setVisible(false);

  return (
    <Modal
      open={visible}
      onClose={handleOnCancel}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        border: "none",
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
      <Grid style={{ background: "white", padding: "2rem" }}>
        <Typography>This action is can not be undone!</Typography>
        <form
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          onSubmit={handleOnOk}>
          <Button
            style={{ marginTop: "2rem", marginRight: "7px" }}
            variant="contained"
            color="secondary"
            key="back" onClick={handleOnCancel}>
            <Typography>Cancel</Typography>
          </Button>
          <Button
            style={{ marginTop: "2rem" }}
            variant="contained"
            color="primary"
            key="remove" type="submit">
            <Typography> Remove</Typography>
          </Button>
        </form>
      </Grid>
    </Modal>
  );
};

export default RemoveStepModal;
