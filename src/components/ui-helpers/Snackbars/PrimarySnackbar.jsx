import React from "react";
import { Snackbar, Alert } from "@mui/material";

const PrimarySnackbar = (props, ref) => {
  const {
    message,
    includeAlert = false,
    severity = "info",
    autoHideDuration = 6000,
    anchorOrigin = {
      vertical: "bottom",
      horizontal: "left"
    }
  } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useImperativeHandle(ref, () => ({
    openSnackbar() {
      handleClick();
    }
  }));

  return (
    <>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={includeAlert ? "" : message}
      >
        {includeAlert ? (
          <>
            <Alert handleClose={handleClose} severity={severity}>
              {message}
            </Alert>
          </>
        ) : null}
      </Snackbar>
    </>
  );
};

export default React.forwardRef(PrimarySnackbar);
