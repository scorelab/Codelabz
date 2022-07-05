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
          <Input type="password" className={classes.input} />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>New password</Typography>
          <Input type="password" className={classes.input} />
        </Box>
        <Box style={{ margin: "5px 0" }}>
          <Typography className={classes.text}>Confirm new password</Typography>
          <Input type="password" className={classes.input} />
        </Box>
        <Button className={classes.button}>Update Password</Button>
        <Box className={classes.row}>
          <Typography className={classes.text}>Logout</Typography>
          <Typography
            className={classes.text}
            style={{ marginRight: 40, color: "#0075AD" }}
          >
            Logout of all other browsers
          </Typography>
        </Box>
        <Box className={classes.row}>
          <Typography className={classes.text}>Login security</Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography className={classes.text}>
              Require email verification
            </Typography>
            <Switch color="primary" />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default UserPassword;
