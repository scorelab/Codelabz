import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { useFirebase, useFirestore, isLoaded, isEmpty } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { addOrgUser } from "../../../../store/actions";
import { Alert } from "@mui/material";
import { useEffect } from "react";



import { min } from "lodash";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAdmin({ open, onClose, onSubmit }) {
  const userProps = useSelector(({ org: { user } }) => user);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = React.useState(0);
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

  const handleChange = (e) => {
    const userEntered = e.target.value;
    setUserName(userEntered);
    setError(0);
  };

  const handleClose = () => {
    onClose();
    setUserName("")
  };

   async function handleSubmit () {
    if (userName=== "" ) {
      setError(1);
      setAlert("All Fields are needed to be filled");
    }
    else if (currentUser == userName) {
      setError(1);
      setAlert("You can not Add yourself");
    }
    else{
      try{
        const org_handle = currentOrgHandle;
        const handle = userName;
        const permissions = 3;
        await addOrgUser({
          org_handle,
          handle,
          permissions
        })(firestore, dispatch);
        onSubmit(userName);

        onClose();
        setUserName("")

      }
      catch(error){
        console.log(error)
      }
     
    }
   
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="alert-dialog-title">{"Add New Admin"}</DialogTitle>
        <DialogContent>
        {error ? (
            <Alert severity="error">{alert}</Alert>
          ) : (
            <p>Add the contributor info</p>
          )}
          <Box component="form" style={{ marginTop: "10px" }} noValidate autoComplete="off">
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
          <Button onClick={handleSubmit} autoFocus variant="outlined" color="success">
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
