import React from "react";
import useStyles from "./styles";
import { Box, Card, Typography, Button, Switch } from "@material-ui/core";
import { Input } from "../../ui-helpers/Inputs/SecondaryInput";

const UserPassword = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box style={{ marginBottom: "5px" }}>
          <Typography className={classes.text}>Old password</Typography>
          <Input
            type="password"
            className={classes.input}
            data-testId="oldPassword"
          />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>New password</Typography>
          <Input
            type="password"
            className={classes.input}
            data-testId="newPassword"
          />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>Confirm new password</Typography>
          <Input
            type="password"
            className={classes.input}
            data-testId="confirmPassword"
          />
        </Box>
        <Button className={classes.button} data-testId="updatePassword">
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
