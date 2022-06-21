import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import dp from "../../../../assets/images/demoperson1.jpeg";
import iconbuttonImage from "../../../../assets/images/Filled3dots.svg";

export default function ProfileCard1() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          <div className={classes.profileInfo}>
            <div>
              <img className={classes.profileUserImg} src={dp} alt="Avatar" />
            </div>
            <div style={{ width: "fit-content", marginLeft: "2.5rem" }}>
              <Typography className={classes.profileInfoName}>
                Safak Kocaoglu
              </Typography>

              <Typography className={classes.profileInfoStory}>
                Safak Kocaoglu
              </Typography>
              <Grid container>
                <span
                  className={classes.profileInfoData}
                  style={{ marginRight: "20px" }}
                >
                  25 followers
                </span>
                <span
                  className={classes.profileInfoData}
                  style={{ marginRight: "2px" }}
                >
                  • 5 following
                </span>
              </Grid>
              <Grid container style={{ marginTop: "15px" }}>
                <button className={classes.profileSubscribeButton}>
                  Follow
                </button>
                <button className={classes.profileShareButton}>Share</button>
                <button className={classes.profileReportButton}>Report</button>
                <button className={classes.profileIconButton}>
                  <img src={iconbuttonImage} alt="iconbutton" />
                </button>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
