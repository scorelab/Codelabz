import React, { useState,useEffect } from "react";
import useStyles from "./styles";
import { Box, Card, Typography, Button, Switch } from "@mui/material";
import { Input } from "../../ui-helpers/Inputs/SecondaryInput";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { updateUserPassword } from "../../../store/actions";
import Swal from 'sweetalert2'

const UserPassword = () => {
  const classes = useStyles();
  const firebase = useFirebase()
  const dispatch = useDispatch()

  const [oldPassword,setOldPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmNewPassword,setConfirmNewPassword] = useState('')
  

  const handleChangePassword=async()=>{
    console.log(newPassword != confirmNewPassword)
    if(newPassword != confirmNewPassword){
      Swal.fire({
        icon: "error",
        title: "Invalid Entry...",
        text: "Password don't match!",
        footer: ''
      });
      return;
    }
    const res = await updateUserPassword(oldPassword,confirmNewPassword)(firebase,dispatch)
    if(res === true){
      Swal.fire({
        title: "Password updated successfully!",
        text: "Password updated!",
        icon: "success"
      });
      setOldPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    }else if (res === "New and the old password should not be same"){
      Swal.fire({
        icon: "error",
        title: "Invalid Entry...",
        text: "New and the old password should not be same!",
        footer: ''
      });
    }else if (res === "Password should contain minimum 8 characters long"){
      Swal.fire({
        icon: "error",
        title: "Invalid Entry...",
        text: "Password should contain minimum 8 characters long!",
        footer: ''
      });
    }
  }
  
  return (
    <Card className={classes.card} data-testId="passwordPage">
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box style={{ marginBottom: "5px" }}>
          <Typography className={classes.text}>Old password</Typography>
          <Input
            type="password"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            className={classes.input}
            data-testId="oldPassword"
          />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>New password</Typography>
          <Input
            type="password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className={classes.input}
            data-testId="newPassword"
          />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>Confirm new password</Typography>
          <Input
            type="password"
            value={confirmNewPassword}
            onChange={(e)=>setConfirmNewPassword(e.target.value)}
            className={classes.input}
            data-testId="confirmPassword"
          />
        </Box>
        <Button className={classes.button} data-testId="updatePassword" onClick={handleChangePassword}>
          Update Password
        </Button>
        <Box className={classes.row}>
          <Typography className={classes.text} data-testId="logout">
            Logout
          </Typography>
          <Typography
            className={classes.text}
            style={{ marginRight: 40, color: "#0075AD" }}
            data-testId="logoutOfOtherBrowsers"
          >
            Logout of all other browsers
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Typography className={classes.text} data-testId="loginSecurity">
            Login security
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography className={classes.text}>
              Require email verification
            </Typography>
            <Switch color="primary" data-testId="emailVerification" />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default UserPassword;