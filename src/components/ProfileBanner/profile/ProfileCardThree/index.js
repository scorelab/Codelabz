import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
export default function ProfileCardThree({
  profileImage,
  name,
  story,
  work,
  location,
  joiningDate,
}) {
  const classes = useStyles();
  return (
    <>
      <Box
        className={classes.profileRightTop}
        data-testId="user_profile_card_three"
      >
        <div className={classes.profileCover}>
          <div className={classes.profileInfo}>
            <Grid container spacing={2}>
              <Grid item>
                <img
                  className={classes.profileUserImg}
                  src={profileImage}
                  alt="User Profile Avatar"
                  data-testId="user_profile_card_three_avatar"
                />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.profileInfoName}
                  data-testId="user_profile_card_three_name"
                >
                  {name}
                </Typography>
              </Grid>
            </Grid>
            <button className={classes.profileSubscribeButton}>Follow</button>
            <Grid container className={classes.profileInfoDesc}>
              <div className={classes.profileInfoText}>
                <Typography
                  className={classes.profileInfoStory}
                  data-testId="user_profile_card_three_story"
                >
                  {story}
                </Typography>
              </div>
              <div className={classes.profileInfoText}>
                <Typography className={classes.profileInfoAboutTitle}>
                  Work
                </Typography>
                <Typography
                  className={classes.profileInfoAboutInfo}
                  data-testId="user_profile_card_three_workInfo"
                >
                  {work}
                </Typography>
              </div>
              <div className={classes.profileInfoText}>
                <Typography className={classes.profileInfoAboutTitle}>
                  Location
                </Typography>
                <Typography
                  className={classes.profileInfoAboutInfo}
                  data-testId="user_profile_card_three_locationInfo"
                >
                  {location}
                </Typography>
              </div>
              <div className={classes.profileInfoText}>
                <Typography className={classes.profileInfoAboutTitle}>
                  Joined
                </Typography>
                <Typography
                  className={classes.profileInfoAboutInfo}
                  data-testId="user_profile_card_three_joiningDateInfo"
                >
                  {joiningDate}
                </Typography>
              </div>
            </Grid>
          </div>
        </div>
      </Box>
    </>
  );
}
