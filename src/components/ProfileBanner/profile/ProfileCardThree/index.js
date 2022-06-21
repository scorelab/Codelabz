import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import dp from "../../../../assets/images/demoperson1.jpeg";
import Box from "@material-ui/core/Box";
export default function ProfileCard3() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          <div className={classes.profileInfo}>
            <Grid container spacing={2}>
              <Grid item>
                <img className={classes.profileUserImg} src={dp} />
              </Grid>
              <Grid item>
                <Typography className={classes.profileInfoName}>
                  Safak Kocaoglu
                </Typography>
              </Grid>
            </Grid>
            <button className={classes.profileSubscribeButton}>Follow</button>
            <Grid container className={classes.profileInfoDesc}>
              <div className={classes.profileInfoText}>
                <Typography className={classes.profileInfoStory}>
                  Lorem ipsum dolor sit amet, consectur aipcing elit. In
                  tristique pharetra mi eu tesque. In tique pharetra mi eu
                  pellentesque adipiscing elit.elit. In tristique pharetra mi eu
                  tesque.
                </Typography>
              </div>
              <div className={classes.profileInfoText}>
                <Typography className={classes.profileInfoAboutTitle}>
                  Work
                </Typography>
                <Typography className={classes.profileInfoAboutInfo}>
                  Lorem ipsum
                </Typography>
              </div>
              <div className={classes.profileInfoText}>
                <Typography className={classes.profileInfoAboutTitle}>
                  Location
                </Typography>
                <Typography className={classes.profileInfoAboutInfo}>
                  Lorem ipsum
                </Typography>
              </div>
              <div className={classes.profileInfoText}>
                <Typography className={classes.profileInfoAboutTitle}>
                  Joined
                </Typography>
                <Typography className={classes.profileInfoAboutInfo}>
                  Lorem ipsum
                </Typography>
              </div>
            </Grid>
          </div>
        </div>
      </Box>
    </>
  );
}
