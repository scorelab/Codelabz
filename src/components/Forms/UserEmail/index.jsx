import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Swal from 'sweetalert2'
import {
  Box,
  Card,
  FormControl,
  Typography,
  MenuItem,
  Select,
  OutlinedInput,
  TextField,
  Button
} from "@mui/material";
import { Input } from "../../ui-helpers/Inputs/PrimaryInput";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeUserEmail } from "../../../store/actions";
import validator from "validator";

const UserEmail = () => {
  const classes = useStyles();

  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const [typedEmail, setTypedEmail] = useState('')
  const [selectedEmailType, setSelectedEmailType] = useState('primary email');
  const profileData = useSelector(({ firebase: { profile } }) => profile);

  const [primaryEmail, setPrimaryEmail] = useState(profileData.email ? profileData.email : "none")
  const [backupEmail, setBackupEmail] = useState(profileData.backupEmail ? profileData.backupEmail : "none")

  const handleChangeEmailType = event => {
    setSelectedEmailType(event.target.value)
  }

  const handleEmailChange = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(typedEmail)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email!",
      });
      return
    } else if (typedEmail == primaryEmail || typedEmail == backupEmail) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are already using this email!",
      });
      return
    }
    await changeUserEmail(typedEmail, selectedEmailType, profileData.handle)(firebase, firestore, dispatch)

    if (selectedEmailType == "primary") {
      setPrimaryEmail(typedEmail)
    } else {
      setBackupEmail(typedEmail)
    }
    Swal.fire({
      title: "success!",
      text: `${selectedEmailType} email added successfully`,
      icon: "success"
    });




  }

  return (
    <Card className={classes.card}>
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography style={{ margin: "5px 0" }}>
          {profileData.email} -{" "}
          <Typography variant="span" style={{ color: "#039500" }}>
            Primary
          </Typography>
        </Typography>
        <Box>
          <Typography style={{ margin: "5px 0" }}>Add email address</Typography>
          <Box
            style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          >
              <Input
                placeholder="email"
                value={typedEmail}
                onChange={(e) => setTypedEmail(e.target.value)}
                className={classes.input}
                data-testId="emailInput"
                style={{ height: 40, width: 250 }}
              />
              <Typography data-testId="addEmail">add as</Typography>
              <FormControl data-testId="emailType">
                <Select
                  value={selectedEmailType}
                  onChange={handleChangeEmailType}
                  input={<OutlinedInput style={{ height: 40, width: 250, marginLeft: 5 }} />}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="primary" data-testId="primaryEmailItem">
                    primary email
                  </MenuItem>
                  <MenuItem value="backup" data-testId="backupEmailItem">
                    backup email
                  </MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" onClick={handleEmailChange} color="primary" style={{ marginLeft: 5 }}>
                Add
              </Button>
          </Box>
        </Box>
        <Box className={classes.email}>
          <Typography className={classes.text} style={{ marginRight: 30 }}>
            Primary email address
          </Typography>
          <FormControl data-testId="primaryEmail">
            <TextField
              label="Primary Email"
              variant="outlined"
              style={{ height: 40, width: 250, marginBottom: 2 }}
              value={primaryEmail}
              // onChange={handleChangePrimaryEmail}
              InputProps={{ readOnly: true }}
              inputProps={{ "aria-label": "Primary Email" }}
            />
          </FormControl>
        </Box>
        <Box className={classes.email}>
          <Typography className={classes.text} style={{ marginRight: 30 }}>
            Backup email   address
          </Typography>
          <FormControl data-testId="backupEmail">
            <TextField
              label="Backup Email"
              variant="outlined"
              style={{ height: 40, width: 250 }}
              value={backupEmail}
              // onChange={handleChangeBackupEmail}
              InputProps={{ readOnly: true }}
              inputProps={{ "aria-label": "Backup Email" }}
            />
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
};

export default UserEmail;