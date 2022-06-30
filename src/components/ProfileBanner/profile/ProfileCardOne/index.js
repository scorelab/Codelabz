import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// import dp from "../../../../assets/images/demoperson1.jpeg";
import iconbuttonImage from "../../../../assets/images/Filled3dots.svg";

export default function ProfileCardOne({
  profileImage,
  name,
  story,
  followers,
  following,
}) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          <div className={classes.profileInfo}>
            <div>
              <img className={classes.profileUserImg} src={profileImage} alt="Avatar" />
            </div>
            <div style={{ width: "fit-content", marginLeft: "2.5rem" }}>
              <Typography className={classes.profileInfoName}>
                {name}
              </Typography>

              <Typography className={classes.profileInfoStory}>
                {story}
              </Typography>
              <Grid container>
                <span
                  className={classes.profileInfoData}
                  style={{ marginRight: "20px" }}
                >
                  {followers} followers
                </span>
                <span
                  className={classes.profileInfoData}
                  style={{ marginRight: "2px" }}
                >
                  • {following} following
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
