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
      <div
        className={classes.profileRightTop}
        data-testId="user_profile_card_one"
      >
        <div className={classes.profileCover}>
          <div className={classes.profileInfo}>
            <div>
              <img
                className={classes.profileUserImg}
                src={profileImage}
                alt="Avatar"
                data-testId="user_profile_card_one_avatar"
              />
            </div>
            <div style={{ width: "fit-content", marginLeft: "2.5rem" }}>
              <Typography
                className={classes.profileInfoName}
                data-testId="user_profile_card_one_name"
              >
                {name}
              </Typography>

              <Typography
                className={classes.profileInfoStory}
                data-testId="user_profile_card_one_story"
              >
                {story}
              </Typography>
              <Grid container>
                <span
                  className={classes.profileInfoData}
                  style={{ marginRight: "20px" }}
                  data-testId="user_profile_card_one_follwerCount"
                >
                  {followers} followers
                </span>
                <span
                  className={classes.profileInfoData}
                  style={{ marginRight: "2px" }}
                  data-testId="user_profile_card_one_followingCount"
                >
                  • {following} following
                </span>
              </Grid>
              <Grid
                container
                style={{ marginTop: "15px" }}
                data-testId="user_profile_card_one_buttonGroup"
              >
                <button
                  className={classes.profileSubscribeButton}
                  data-testId="user_profile_card_one_buttonGroup_followButton"
                >
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
