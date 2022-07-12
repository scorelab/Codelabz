import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import dp from "../../../assets/images/demoperson1.jpeg";
import BannerDemo from "../../../assets/images/OrgBannerDemo.png";
import iconbuttonImage from "../../../assets/images/unfilled3holes.svg";

export default function Banner({
  bannerImage,
  profileImage,
  name,
  story,
  followers,
  contributors,
  feed,
}) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileRightTop} data-testId="orgprofilebanner">
        <div className={classes.profileCover}>
          <img
            className={classes.profileCoverImg}
            src={BannerDemo}
            alt="Profile Banner"
            data-testId="orgbannerimg"
          />
          <div className={classes.profileInfo}>
            <img
              className={classes.profileUserImg}
              src={profileImage}
              alt="Avatar"
              data-testId="orgbanneravatar"
            />
            <Typography
              className={classes.profileInfoName}
              data-testId="orgbannername"
            >
              {name}
            </Typography>

            <div className={classes.profileInfoDesc}>
              <div item xs={5} spacing={4}>
                <Typography
                  className={classes.profileInfoStory}
                  data-testId="orgbannerstory"
                >
                  {story}
                </Typography>
                <Grid container>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "20px" }}
                    data-testId="orgbannercontributorCount"
                  >
                    {contributors} Contributors
                  </span>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "20px" }}
                    data-testId="orgbannerfollowerCount"
                  >
                    {followers} followers
                  </span>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "20px" }}
                    data-testId="orgbannerfeedCount"
                  >
                    {feed} feeds in the last week
                  </span>
                </Grid>
              </div>
              <div item xs={3}>
                <Grid container>
                  <button className={classes.profileIconButton}>
                    <img src={iconbuttonImage} alt="iconbutton" />
                  </button>
                  <button
                    className={classes.profileSubscribeButton}
                    data-testId="orgbannersubscribeButton"
                  >
                    SUBSCIBE
                  </button>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
