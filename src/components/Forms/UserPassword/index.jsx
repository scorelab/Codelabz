import React, { useState } from "react";
import useStyles from "./styles";
import { Box, Card, Typography, Button, Switch, Snackbar } from "@mui/material";
import { Input } from "../../ui-helpers/Inputs/SecondaryInput";
import { auth } from "../../../config/index";
import { EmailAuthProvider } from "firebase/auth";

const UserPassword = () => {
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    setOpenSnackbar(false);
  };

  const handleUpdatePassword = () => {
    const user = auth.currentUser;
    setOpenSnackbar(false);

    if (!user) {
      console.log("No user Found");
      setError("No user found");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log("New password and confirm password do not match.");
      setError("New password and confirm password do not match.");
      setOpenSnackbar(true);
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, oldPassword);

    user.reauthenticateWithCredential(credential)
      .then(() => {
        setError(null);

        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("password updated successfully.");
            setSuccessMessage("Password updated successfully");
            setOpenSnackbar(true);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            console.error("Error updating password:", error.message);
            setError("Failed to update password. Please try again.");
            setOpenSnackbar(true);
          });
      })
      .catch((error) => {
        console.error("Error reauthenticating user:", error.message);
        setError("Authentication failed. Please provide the correct current password.");
        setOpenSnackbar(true);
      })
  };

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
            className={classes.input}
            data-testId="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>New password</Typography>
          <Input
            type="password"
            className={classes.input}
            data-testId="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>Confirm new password</Typography>
          <Input
            type="password"
            className={classes.input}
            data-testId="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        <Button
          className={classes.button}
          data-testId="updatePassword"
          onClick={handleUpdatePassword}
        >
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error || successMessage}
        severity={error ? "error" : "success"}
      />
      
    </Card>
  );
};

export default UserPassword;
