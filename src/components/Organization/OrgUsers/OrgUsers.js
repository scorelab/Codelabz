import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightMedium,
  },
  body: {
    fontSize: theme.typography.pxToRem(12),
  },
  userCard: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
    borderRadius: "10px",
  },
  userList: {
    marginTop: theme.spacing(2),
  },
  userName: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightMedium,
  },
  userDesignation: {
    fontSize: theme.typography.pxToRem(14),
    paddingLeft: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightLight,
  },
}));

function Orgusers({ Users, title, description }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper elevation={0} className={classes.root}>
        <Grid container direction="row">
          <Grid item container xs={10} direction="column">
            <Grid item>
              <Typography className={classes.heading}>{title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.body}>
                {description}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={2} justifyContent="flex-end">
            <Button variant="contained" color="primary">
              Add New
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.userList}>
          {Users.map((user, index) => (
            <React.Fragment key={index}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.userCard}
              >
                <Grid
                  item
                  container
                  xs={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  {user.avatar.type === "char" ? (
                    <Avatar>{user.avatar.value}</Avatar>
                  ) : (
                    <Avatar src={user.avatar.value} />
                  )}
                </Grid>
                <Grid
                  item
                  xs={11}
                  container
                  direction="row"
                  alignItems="center"
                >
                  <Typography className={classes.userName}>
                    {user.name},
                  </Typography>
                  <Typography className={classes.userDesignation}>
                    {user.designation}
                  </Typography>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default Orgusers;
