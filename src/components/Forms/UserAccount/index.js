import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const UserAccount = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Box style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <Typography className={classes.text} style={{ width: "56%" }}>
          Export account data
        </Typography>
        <Typography className={classes.text} style={{ color: "#0075AD" }}>
          Start export
        </Typography>
      </Box>
      <Box style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
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
