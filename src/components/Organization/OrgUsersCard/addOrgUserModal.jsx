import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import Autocomplete from "@mui/material/Autocomplete";
import { addOrgUser, checkUserHandleExists } from "../../../store/actions";
import {
  isEmpty,
  isLoaded,
  useFirebase,
  useFirestore
} from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const AddOrgUserModal = ({ currentOrgHandle }) => {
  const [users, setUsers] = useState([]);
  const currentUser = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );
  const currentOrgUsers = useSelector(
    ({
      org: {
        user: { data }
      }
    }) => data
  );

  const firebase = useFirebase();

  useEffect(() => {
    setUsers([]);
    firebase.ref(`cl_user_handle/`).on("value", snapshot => {
      snapshot.forEach(snap => {
        setUsers(prev => [...prev, { title: snap.key, value: snap.key }]);
      });
    });
  }, [firebase]);

  const userProps = useSelector(({ org: { user } }) => user);
  const [loading, setLoading] = useState(false);
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [handle, setHandle] = useState("");
  const [handleValidateError, setHandleValidateError] = useState(false);
  const [handleValidateErrorMessage, setHandleValidateErrorMessage] =
    useState("");
  const [selected, setSelected] = useState("perm_0");
  const options = [
    { name: "Reviewer", icon: <VisibilityIcon />, value: "perm_0" },
    { name: "Editor", icon: <EditIcon />, value: "perm_1" },
    { name: "Admin", icon: <PersonIcon />, value: "perm_2" }
  ];

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

  const onFinish = async () => {
    const handleExists = await checkUserHandleExists(handle)(
      firebase,
      dispatch
    );

    if (handle.length < 1) {
      setHandleValidateError(true);
      setHandleValidateErrorMessage(`Handle cannot be empty`);
      return;
    }
    if (handleExists === false) {
      setHandle("");
      setHandleValidateError(true);
      setHandleValidateErrorMessage(
        `The handle ${handle} is not a registered CodeLabz user`
      );
    } else if (handle === currentUser) {
      setHandle("");
      setHandleValidateError(true);
      setHandleValidateErrorMessage(`You can't add yourself. Or can you? o.O`);
    } else if (
      _.findIndex(currentOrgUsers, user => user.handle === handle) !== -1
    ) {
      setHandle("");
      setHandleValidateError(true);
      setHandleValidateErrorMessage(
        `The user ${handle} is already in the organization ${currentOrgHandle}`
      );
    } else {
      await addOrgUser({
        org_handle: currentOrgHandle,
        permissions: parseInt(selected.split("_")[1]),
        handle: handle
      })(firestore, dispatch);
    }
  };

  const handlePermissionChange = event => {
    setSelected(event.target.value);
  };

  return (
    <Grid container item={true}>
      <Autocomplete
        label="User Handle"
        variant="outlined"
        id="Search"
        autoComplete="off"
        onChange={e => setHandle(e.target.innerHTML)}
        helperText={handleValidateError ? handleValidateErrorMessage : null}
        options={users}
        getOptionLabel={option => option.title}
        style={{ width: "100%" }}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose User"
            variant="outlined"
            inputProps={{
              ...params.inputProps
            }}
          />
        )}
      />
      {console.log(users)}
      <Grid container justify="flex-end">
        <div style={{ padding: "10px" }}>
          <span style={{ paddingRight: "10px" }}>Select user role</span>
          <Select value={selected} onChange={handlePermissionChange}>
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  {option.icon}
                  <div style={{ paddingLeft: "5px" }}>{option.name}</div>
                </div>
              </MenuItem>
            ))}
          </Select>
        </div>
      </Grid>

      <Button
        style={{ backgroundColor: "royalblue", color: "white" }}
        fullWidth
        variant="contained"
        onClick={onFinish}
      >
        {loading ? "Adding user..." : "Add user"}
      </Button>
    </Grid>
  );
};

export default AddOrgUserModal;
