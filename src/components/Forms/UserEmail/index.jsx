import React, { useState } from "react";
import useStyles from "./styles";
import data from "./emailAddressConfig.json";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  FormControl,
  Typography,
  MenuItem,
  Select,
  OutlinedInput
} from "@mui/material";
import { Input } from "../../ui-helpers/Inputs/PrimaryInput";
import { addEmail } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { Avatar, Button } from "@mui/material";
const UserEmail = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();

  const classes = useStyles();

  const [primaryEmail, setPrimaryEmail] = useState(data.primaryEmail);
  const [backupEmail, setBackupEmail] = useState(data.backupEmail);

  const profileData = useSelector(({ firebase: { profile } }) => profile);

  const handleChangePrimaryEmail = event => {
    setPrimaryEmail(event.target.value);
  };

  const handleChangeBackupEmail = event => {
    setBackupEmail(event.target.value);
  };

  const [email, setEmail] = useState("");
  const handleemailinput = event => setEmail(event.target.value);
  const handleAddEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() !== "" && emailRegex.test(email)) {
      console.log(email);
      addEmail({
        additionalEmail: email
      })(firebase, firestore, dispatch);
      console.log(email);
    } else {
      console.error("Not a valid email address");
    }
  };
  
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
          {data.primaryEmail} -{" "}
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
              className={classes.input}
              data-testId="emailInput"
              value={email}
              onChange={handleemailinput}
            />
            <Typography data-testId="addEmail" onClick={handleAddEmail}>
              <Button>Add</Button>
            </Typography>
          </Box>
        </Box>
        <Box className={classes.email}>
          <Typography className={classes.text} style={{ marginRight: 30 }}>
            Primary email address
          </Typography>
          <FormControl data-testId="primaryEmail">
            <Select
              value={profileData.email}
              onChange={handleChangePrimaryEmail}
              input={<OutlinedInput style={{ height: 40, width: 250 }} />}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem
                value={profileData.email}
                data-testId="primaryEmailItem"
              >
                {profileData.email}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.email}>
          <Typography className={classes.text} style={{ marginRight: 30 }}>
            Backup email address
          </Typography>
          <FormControl data-testId="backupEmail">
            <Select
              value={backupEmail}
              onChange={handleChangeBackupEmail}
              input={<OutlinedInput style={{ height: 40, width: 250 }} />}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {data.backupEmailOptions.map(email => (
                <MenuItem value={email} data-testId="backupEmailItem">
                  {email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
};

export default UserEmail;
