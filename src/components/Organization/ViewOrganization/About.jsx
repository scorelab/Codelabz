import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import AboutUsers from "../../UserDetails/AboutUsers";
import Orgusers from "../OrgUsers/OrgUsers";
import Orgsocial from "../Orgsocial/index";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  heading: {
    fontWeight: 600
  },
  description: {
    width: "100%",
    marginTop: 10
  }
}));

const AdminUsers = [
  {
    name: "Shahaab Manzar",
    designation: "GSoC 22'",
    avatar: {
      type: "char",
      value: "A"
    }
  },
  {
    name: "Sarfraz Alam",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  }
];

const ContributersUsers = [
  {
    name: "Sarfraz Alam",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  },
  {
    name: "Jhanvi Thakkar",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  },
  {
    name: "Saksham Sharma",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  }
];

const SubscribeUsers = [
  {
    name: "Sarfraz Alam",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  },
  {
    name: "Jhanvi Thakkar",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  },
  {
    name: "Saksham Sharma",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  },
  {
    name: "Ayush Bansal",
    designation: "GSoC 22'",
    avatar: {
      type: "image",
      value: "https://i.pravatar.cc/300"
    }
  }
];

function About() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div
        style={{
          marginTop: "1rem"
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item container xs={12}>
            <Grid item>
              <Typography variant="h5" className={classes.heading}>
                Description
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AboutUsers
                className={classes.description}
                Content={
                  "Et non laborum voluptate non sunt ut nisi laboris adipisicing elit. Officia tempor enim quis esse ut officia laboris nostrud nisi nostrud Lorem pariatur. Proident excepteur elit duis exercitation qui magna. Laboris enim ipsum voluptate nostrud dolor et consectetur labore reprehenderit velit non fugiat. Adipisicing dolor ad aliqua fugiat veniam cupidatat laboris anim eu proident. Dolore consequat exercitation reprehenderit officia aute ipsum voluptate.Fugiat mollit aliqua officia laborum ex. Velit sunt veniam laboris et duis. Mollit aliqua pariatur fugiat sunt cupidatat minim in tempor magna cillum culpa consequat eu non. Non excepteur nostrud nulla do labore proident sunt elit duis sint sunt non. Velit id non ullamco ad et excepteur officia do. Ad exercitation veniam qui duis mollit commodo cupidatat do esse ex ut aliqua."
                }
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.heading}>
              Organization users
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Orgusers
              Users={AdminUsers}
              title="Admin Users"
              description="Admins can manage submissions, content, and settings"
              DataTestId="org-admin-list"
            />
          </Grid>
          <Grid item xs={12}>
            <Orgusers
              Users={ContributersUsers}
              title="Contributers"
              description="Contributers can contribute to the project"
              DataTestId="org-contributor-list"
            />
          </Grid>
          <Grid item xs={12}>
            <Orgusers
              Users={SubscribeUsers}
              title="Subscribers"
              description="Subscribers can view the project"
              DataTestId="org-subscriber-list"
              isViewMore={true}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" className={classes.heading}>
              Follow us on Social Media
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Orgsocial toOpen={true} />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default About;
