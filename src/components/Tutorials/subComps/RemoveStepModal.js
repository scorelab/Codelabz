import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

const RemoveStepModal = ({
  owner,
  tutorial_id,
  step_id,
  viewModal,
  currentStep,
  step_length,
}) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(viewModal);
  }, [viewModal]);

  const handleOnOk = () => {
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={true}
      autoHideDuration={6000}
      message="Updating...."
    />;
    if (step_length > 1) {
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
            horizontal: "left",
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
        left: "40%",
      }}
    >
      <div>
        <Typography>This action is can not be undone!</Typography>
        <form onSubmit={handleOnOk}>
          <Button key="back" onClick={handleOnCancel}>
            <Typography>Cancel</Typography>
          </Button>
          <Button key="submit" type="primary" htmlType="submit">
            <Typography> Remove</Typography>
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default RemoveStepModal;
