import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  InputBase,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "10px",
    marginTop: '15px',
    display: 'flex',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
    width: '98%',
    marginBottom: '20px',
    [theme.breakpoints.between('xs', 'sm')]:{
      marginLeft:'10px'
    },

  },
  input: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "10px",
    width: "50%",
    "&:hover": {backgroundColor: '#F5F5F5'},
    [theme.breakpoints.between('xs', 'sm')]:{
      width:'100%',
    },
    [theme.breakpoints.between('sm', 'md')]:{
      width:'70%',
    },
    [theme.breakpoints.between('md', 'lg')]:{
      width:'35%',
    }
  },
  button: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px"
  },
  responsiveHeading:{
    fontSize: "1.5rem",
    fontWeight: 100,
    [theme.breakpoints.between('xs', 'sm')]: {
      textAlign: 'center'
    }
  },
  responsiveInput:{
    [theme.breakpoints.between('xs', 'sm')]: {
      textAlign: 'center'
    },
  }
}));

function Passwords() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        className={classes.root}
        spacing={3}
        data-testid="organization-passwords-page"
      >
        <Grid item xs={12}>
          <Typography className={classes.responsiveHeading}>Passwords</Typography>
        </Grid>
        <Grid className={classes.responsiveInput} item xs={12}>
          <Typography>Old Password</Typography>
          <InputBase className={classes.input} placeholder="Old Password" />
        </Grid>
        <Grid className={classes.responsiveInput} item xs={12}>
          <Typography>New Password</Typography>
          <InputBase className={classes.input} placeholder="New Password" />
        </Grid>
        <Grid className={classes.responsiveInput} item xs={12}>
          <Typography>Confirm new password</Typography>
          <InputBase
            className={classes.input}
            placeholder="Confirm new password"
          />
        </Grid>
        <Grid className={classes.responsiveInput} item xs={12}>
          <Button className={classes.button}>Update Password</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Passwords;
