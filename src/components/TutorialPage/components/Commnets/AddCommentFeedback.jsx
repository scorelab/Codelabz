import React from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCommentFeedback = ({ open, setOpen }) => {
  const addCommentError = useSelector(
    ({
      tutorialPage: {
        comment: { error }
      }
    }) => error
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    >
      {!addCommentError ? (
        <Alert severity="success" sx={{ width: "100%" }}>
          Comment Added Sucessfully
        </Alert>
      ) : (
        <Alert severity="error" sx={{ width: "100%" }}>
          Comment could not be added. Please try again later.
        </Alert>
      )}
    </Snackbar>
  );
};

AddCommentFeedback.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default AddCommentFeedback;
