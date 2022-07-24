import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  InputBase,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: 100,
  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "50%",
  },
  button: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
  },
}));

function Passwords() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.heading}>Passwords</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Old Password</Typography>
          <InputBase className={classes.input} placeholder="Old Password" />
        </Grid>
        <Grid item xs={12}>
          <Typography>New Password</Typography>
          <InputBase className={classes.input} placeholder="New Password" />
        </Grid>
        <Grid item xs={12}>
          <Typography>Confirm new password</Typography>
          <InputBase
            className={classes.input}
            placeholder="Confirm new password"
          />
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.button}>Update Password</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Passwords;
