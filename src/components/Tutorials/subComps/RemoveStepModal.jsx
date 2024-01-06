import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { removeStep } from "../../../store/actions";

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

  const handleOnOk = (event) => {
    event.preventDefault();
    if (step_length > 1) {
      removeStep(owner, tutorial_id, step_id, currentStep)(
        firebase,
        firestore,
        dispatch
      ).then(() => {
        setVisible(false);
        // Show success message or dispatch another action if needed
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
        justifyContent: "center",
        textAlign:"center"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%"
        }}
      >
        <Typography variant="h6" gutterBottom>
          This action cannot be undone!
        </Typography>
        <form onSubmit={handleOnOk}>
          <Button
            variant="outlined"
            style={{ marginRight: "10px" }}
            onClick={handleOnCancel}
            color="success"
            
          >
            Cancel
          </Button>
          <Button variant="outlined" type="submit" color="error">
            Remove
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default RemoveStepModal;
