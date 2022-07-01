import React from "react";
import { Box, Card, Typography } from "@material-ui/core";
import useStyles from "./styles";

const UserAccount = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Box className={classes.row}>
        <Typography className={classes.text} style={{ width: "56%" }}>
          Export account data
        </Typography>
        <Typography className={classes.text} style={{ color: "#0075AD" }}>
          Start export
        </Typography>
      </Box>
      <Box className={classes.row}>
        <Typography className={classes.text} style={{ width: "56%" }}>
          Successor settings
        </Typography>
        <Typography className={classes.text} style={{ color: "#0075AD" }}>
          Add successor
        </Typography>
      </Box>
      <Typography
        className={classes.text}
        style={{ color: "#FF5959", marginBottom: 10 }}
      >
        Deactivate account
      </Typography>
      <Typography className={classes.text} style={{ color: "#FF5959" }}>
        Delete account
      </Typography>
    </Card>
  );
};

export default UserAccount;
