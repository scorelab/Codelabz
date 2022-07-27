import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Orgusers from "../OrgUsers/OrgUsers";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  heading: {
    fontWeight: 100,
    fontSize: "1.6rem",
  },
}));

function Users() {
  const classes = useStyles();

  const AdminUsers = [
    {
      name: "Shahaab Manzar",
      designation: "GSoC 22'",
      avatar: {
        type: "char",
        value: "A",
      },
    },
    {
      name: "Sarfraz Alam",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
  ];

  const ContributersUsers = [
    {
      name: "Sarfraz Alam",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
    {
      name: "Jhanvi Thakkar",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
    {
      name: "Saksham Sharma",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
    {
      name: "Mehender boi",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
  ];

  return (
    <React.Fragment>
      <Grid container className={classes.root} direction="column" spacing={3}>
        <Grid item>
          <Typography className={classes.heading}>Users</Typography>
        </Grid>
        <Grid item>
          <Orgusers
            Users={AdminUsers}
            title="Admin"
            description="Admins can manage submissions, content, and settings"
            AddUser={true}
            dataTestId="org-admin-list"
          />
        </Grid>
        <Grid item>
          <Orgusers
            Users={ContributersUsers}
            title="Contributers"
            description="Contributers can contribute to the project"
            AddUser={true}
            isViewMore={true}
            dataTestId="org-contributor-list"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Users;
