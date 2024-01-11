import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import {
  useFirebase,
  useFirestore,
  isLoaded,
  isEmpty
} from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeOrgUser } from "../../../store/actions";
import { Alert } from "@mui/material";
import { useEffect } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RemoveUser({ open, onClose, onSubmit }) {
  const userProps = useSelector(({ org: { user } }) => user);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = React.useState(0);
  const handleClose = () => {
    onClose();
    setUserName("");
  };
  useEffect(() => {
    if (!isLoaded(userProps) && isEmpty(userProps)) {
      setLoading(true);
    }
    if (isLoaded(userProps) && !isEmpty(userProps)) {
      setLoading(false);
    }
    if (isLoaded(userProps) && isEmpty(userProps)) {
      setLoading(false);
    }
  }, [userProps]);
  const handleChange = e => {
    const userEntered = e.target.value;
    setUserName(userEntered);
    setError(0);
  };
  const currentUser = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );
  const currentOrgHandle = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  const handleSubmit = async () => {
    console.log(currentUser);
    if (userName == "") {
      setError(1);
      setAlert("User Handel is required");
    } else if (userName == currentUser) {
      setError(1);
      setAlert("You cannot remove yourself");
    } else {
      try {
        const org_handle = currentOrgHandle;
        const handle = userName;
        await removeOrgUser({
          org_handle,
          handle
        })(firestore, dispatch);
        onSubmit(userName);

        onClose();
        setUserName("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Dialog
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{"Remove User"}</DialogTitle>
        <DialogContent>
          {error ? (
            <Alert severity="error">{alert}</Alert>
          ) : (
            <p>Enter the user handle</p>
          )}
          <Box
            component="form"
            style={{ marginTop: "10px" }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="User Name"
              variant="outlined"
              onChange={handleChange}
              value={userName}
            />
          </Box>
        </DialogContent>
        <DialogActions style={{ marginBottom: "10px" }}>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant="outlined"
            color="success"
          >
           {loading? "Removing":"Remove"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
