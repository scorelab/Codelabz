import React from "react";
import { Box, Card, Typography } from "@material-ui/core";
import useStyles from "./styles";

const UserAccount = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
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
        className={classes.text}
        style={{ color: "#FF5959", marginBottom: 10 }}
        data-testId="deactivateAccount"
      >
        Deactivate account
      </Typography>
      <Typography
        className={classes.text}
        style={{ color: "#FF5959" }}
        data-testId="deleteAccount"
      >
        Delete account
      </Typography>
    </Card>
  );
};

export default UserAccount;
