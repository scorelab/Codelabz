import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonIcon from "@material-ui/icons/Person";
import { addOrgUser, checkUserHandleExists } from "../../../store/actions";
import {
  isEmpty,
  isLoaded,
  useFirebase,
  useFirestore,
} from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const AddOrgUserModal = ({ currentOrgHandle }) => {
  const currentUser = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );
  const currentOrgUsers = useSelector(
    ({
      org: {
        user: { data },
      },
    }) => data
  );
  const userProps = useSelector(({ org: { user } }) => user);
  const [loading, setLoading] = useState(false);
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [handle, setHandle] = useState("");
  const [handleValidateError, setHandleValidateError] = useState(false);
  const [handleValidateErrorMessage, setHandleValidateErrorMessage] = useState("");
  const [selected, setSelected] = useState("perm_0");
  const options = [
    { name: "Reviewer", icon: <VisibilityIcon />, value: "perm_0" },
    { name: "Editor", icon: <EditIcon />, value: "perm_1" },
    { name: "Admin", icon: <PersonIcon />, value: "perm_2" },
  ];
  const onChangeHandle = (event) => {
    if (event.target.value.length < 1) {
      setHandleValidateError(true);
      setHandleValidateErrorMessage(
        `Please input the user handle you want to add`
      );
      setHandle("");
    } else {
      setHandleValidateError(false);
      setHandle(event.target.value);
    }
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
      _.findIndex(currentOrgUsers, (user) => user.handle === handle) !== -1
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
        handle: handle,
      })(firestore, dispatch);
    }
  };

  const handlePermissionChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Grid container item={true}>
      <TextField
        label="User Handle"
        variant="outlined"
        fullWidth
        value={handle}
        error={handleValidateError}
        onChange={onChangeHandle}
        helperText={handleValidateError ? handleValidateErrorMessage : null}
      />
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
                    justifyContent: "space-between",
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
        style={{ backgroundColor: "#0f7029",color:"white" }}
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
