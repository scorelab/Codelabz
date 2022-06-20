import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import dp from "../../../../assets/images/demoperson1.jpeg";

export default function ProfileCard2() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          <div className={classes.profileInfo}>
            <div>
              <img className={classes.profileUserImg} src={dp} />
            </div>
            <div style={{ width: "fit-content", marginLeft: "2.5rem" }}>
              <Typography className={classes.profileInfoName}>
                Safak Kocaoglu
              </Typography>
                <Typography className={classes.profileInfoStory}>
                  Add Profile Credentials
                </Typography>
                <Grid container>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "20px" }}
                  >
                    5 Contributors
                  </span>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "2px" }}
                  >
                    • 40.2k followers
                  </span>
                </Grid>
                <Typography className={classes.profileInfoData}>
                  Write a description about yourself
                </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
