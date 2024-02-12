import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";
import Snackbar from "@mui/material/Snackbar";
import { useMediaQuery } from "react-responsive";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

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

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)"
  });

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
      <Box
        style={{
          border: "2px solid #000",
          backgroundColor: "#fff",
          boxShadow: "2rem gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "12rem",
          width: "20rem",
          position: "absolute",
          top: "40%",
          left: isDesktop ? "40%" : " 12%"
        }}
      >
      <div style={{ width: "200px", textAlign: "center", backgroundColor: "" }}>
        <Typography style={{ fontSize: "20px" }}>This action is can not be undone!</Typography>
        <form onSubmit={handleOnOk}>
          <Button key="back" onClick={handleOnCancel} style={{ color: "white", marginTop: "10px", backgroundColor: "#000" }}>
            <Typography>Cancel</Typography>
          </Button>
          <Button key="remove" type="submit" style={{ marginTop: "10px", marginLeft: "20px", background: "#fff" }}>
            <Typography> Remove</Typography>
          </Button>
        </form>
      </div>
      </Box>
    </Modal>
  );
};

export default RemoveStepModal;
