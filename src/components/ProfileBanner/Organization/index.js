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
      <div className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          <img
            className={classes.profileCoverImg}
            src={BannerDemo}
            alt="Profile Banner"
          />
          <div className={classes.profileInfo}>
            <img
              className={classes.profileUserImg}
              src={profileImage}
              alt="Avatar"
            />
            <Typography className={classes.profileInfoName}>{name}</Typography>

            <div className={classes.profileInfoDesc}>
              <div item xs={5} spacing={4}>
                <Typography className={classes.profileInfoStory}>
                  {story}
                </Typography>
                <Grid container>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "20px" }}
                  >
                    {contributors} Contributors
                  </span>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "20px" }}
                  >
                    {followers} followers
                  </span>
                  <span
                    className={classes.profileInfoData}
                    style={{ marginRight: "20px" }}
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
                  <button className={classes.profileSubscribeButton}>
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
