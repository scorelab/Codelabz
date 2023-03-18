import React from "react";
import { Box, Card, Typography } from "@mui/material";
import useStyles from "./styles";

const UserAccount = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card} data-testId="userSettingsPage">
      <Box style={{ xs: { maxWidth: "100%" }, md: { maxWidth: "60%" } }}>
        <Box className={classes.row}>
          <Typography
            className={classes.text}
            style={{ width: "56%" }}
            data-testId="exportData"
          >
            Export account data
          </Typography>
          <Typography
            className={classes.text}
            style={{ color: "#0075AD" }}
            data-testId="startExport"
          >
            Start export
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Typography
            className={classes.text}
            style={{ width: "56%" }}
            data-testId="successorSettings"
          >
            Successor settings
          </Typography>
          <Typography
            className={classes.text}
            style={{ color: "#0075AD" }}
            data-testId="addSuccessor"
          >
            Add successor
          </Typography>
        </Box>
        <Typography
        onClick = {() => {}}
          className={classes.button}
          style={{ color: "#FF5959", marginBottom: 10 }}
          data-testId="deactivateAccount"
        >
          Deactivate account
        </Typography>
        <Typography
        onClick = {() => {}}
          className={classes.button}
          style={{ color: "#FF5959" }}
          data-testId="deleteAccount"
        >
          Delete account
        </Typography>
      </Box>
    </Card>
  );
};

export default UserAccount;
