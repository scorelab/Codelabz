import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      >
        <Paper style={{ backgroundColor: "white", padding: "40px", paddingLeft:"50px", paddingRight:"50px" }}>
      <div>
        <Typography  style={{ fontFamily: 'Arial', color: 'grey' }}>This action cannot be undone!</Typography>
        <form onSubmit={handleOnOk}>
          <Button
          style={{ marginTop: "1.6rem", marginRight: "14px" }}
          variant="contained"
          color="secondary"
          key="back"
           onClick={handleOnCancel}>
            <Typography>Cancel</Typography>
          </Button>
          <Button
          style={{ marginTop: "1.6rem" }}
          variant="contained"
          key="remove" type="submit">
            <Typography> Remove</Typography>
          </Button>
        </form>
      </div>
      </Paper>
    </Modal>
  );
};

export default RemoveStepModal;
