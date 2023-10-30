import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { addOrgUser} from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  useFirebase,
  useFirestore,
  isEmpty,
  isLoaded
} from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddContributor({ modalopen, onClose, onSubmit }) {
  const userProps = useSelector(({ org: { user } }) => user);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  
  const [data, setData] = React.useState({
    userName: "",
    role: ""
  });
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

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setError(0);
  };

  const handleModalSubmit = async e => {
    if (data.userName === "" || data.role === "") {
      setError(1);
      setAlert("All Fields are needed to be filled");
    } else if (currentUser == data.userName) {
      setError(1);
      setAlert("You can not Add yourself");
    } else {
      try {
        console.log(data);

        const org_handle = currentOrgHandle;
        const handle = data.userName;
        const permissions = parseInt(data.role);

        await addOrgUser({
          org_handle,
          handle,
          permissions
        })( firestore, dispatch);
      
       
        onSubmit();
        setData({
          userName: "",
          role: ""
        });
      } catch (error) {
       
        console.log(error);
      }
    }
  };

  const handleModalClose = () => {
    onClose();
    setData({
      userName: "",
      role: ""
    });
  };

  return (
    <div>
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        open={modalopen}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Contributor"}</DialogTitle>
        <DialogContent>
          {error ? (
            <Alert severity="error">{alert}</Alert>
          ) : (
            <p>Add the contributor info</p>
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
              value={data.userName}
              name="userName"
              required="true"
            />
            <FormControl fullWidth style={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="role"
                value={data.role}
                onChange={handleChange}
              >
                <MenuItem value="1">Editor</MenuItem>
                <MenuItem value="0">Reviewer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions style={{ marginBottom: "10px" }}>
          <Button onClick={handleModalClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleModalSubmit}
            variant="outlined"
            color="success"
          >
           {loading? "Adding":"Add Contributor"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
