import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

import dp from "../../../assets/images/demoperson1.jpeg";
import iconbuttonImage from "../../../assets/images/unfilled3holes.svg";
import { Button, IconButton, Paper } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Banner({
  bannerImage = "https://postimg.cc/6ystr9mw",
  profileImage = "https://i.pravatar.cc/300",
  name = "Apple",
  story = "Think Different",
  followers = 402,
  contributors = 402,
  feed = 40,
  handle = "apple",
  isOrgBelongsToUser = false
}) {
  const classes = useStyles();
  return (
    <>
      <Paper
        className={classes.profileRightTop}
        elevation={0}
        data-testId="orgprofilebanner"
      >
        <div className={classes.profileCover}>
          <img
            className={classes.profileCoverImg}
            src={bannerImage}
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

            <Grid className={classes.profileInfoDesc}>
              <Grid
                item
                xs={12}
                md={5}
                spacing={4}
                container
                className={classes.profileInfoContainer}
              >
                <Grid item xs={12}>
                  <Typography
                    className={classes.profileInfoStory}
                    data-testId="orgbannerstory"
                  >
                    {story}
                  </Typography>
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      className={classes.profileInfoData}
                      style={{
                        marginRight: "20px",
                        fontSize: 20
                      }}
                      data-testId="orgbannercontributorCount"
                    >
                      {contributors} Contributors
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      className={classes.profileInfoData}
                      style={{
                        marginRight: "20px",
                        fontSize: 20
                      }}
                      data-testId="orgbannerfollowerCount"
                    >
                      {followers} followers
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      className={classes.profileInfoData}
                      style={{
                        marginRight: "20px",
                        fontSize: 20
                      }}
                      data-testId="orgbannerfeedCount"
                    >
                      {feed} feeds in the last week
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={isOrgBelongsToUser ? 6 : 3}
                container
                className={classes.buttonContainer}
              >
                {isOrgBelongsToUser && (
                  <Link
                    data-testId="orgbannereditButton"
                    to={"/org/settings/" + handle}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        color: "white"
                      }}
                    >
                      Edit Org
                    </Button>
                  </Link>
                )}
                <IconButton className={classes.moreDiv}>
                  <MoreHorizIcon className={classes.moreButton} />
                </IconButton>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    boxShadow: "none",
                    px: 2,
                    borderRadius: 5
                  }}
                  data-testId="orgbannersubscribeButton"
                >
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
    </>
  );
}
