import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";

const SuccessModal = ({ visible, onClose, message }) => {
  return (
    <Modal open={visible} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          textAlign: "center",
        }}
      >
        <CheckCircleIcon
          sx={{ color: "green", fontSize: "48px", marginBottom: "16px" }}
        />
        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          {message}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;