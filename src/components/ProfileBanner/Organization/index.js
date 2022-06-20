import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
// import { DeleteIcon } from "@material-ui/core/DeleteIcon";
// import Typography from "@material-ui/core/Typography";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

import dp from "../../../assets/images/demoperson1.jpeg";
export default function Profile() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileRightTop}>
        <div className={classes.profileCover}>
          {/* <img className={classes.profileCoverImg} src={dp} /> */}

          <div className={classes.profileInfo}>
            <img className={classes.profileUserImg} src={dp} />
            <Typography className={classes.profileInfoName}>
              Safak Kocaoglu
            </Typography>

            <Grid container className={classes.profileInfoDesc}>
              <Grid item xs={9} spacing={1}>
                <Typography className={classes.profileInfoStory}>
                  Safak Kocaoglu
                </Typography>
                <Grid container>
                  {/* <Grid item xs={10}> */}
                    <span
                      className={classes.profileInfoData}
                      style={{ marginRight: "20px" }}
                    >
                      5 Contributors
                    </span>
                    <span
                      className={classes.profileInfoData}
                      style={{ marginRight: "20px" }}
                    >
                      40.2k followers
                    </span>
                    <span
                      className={classes.profileInfoData}
                      style={{ marginRight: "20px" }}
                    >
                      40 feeds in the last week
                    </span>
                  {/* </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={2}>
                {/* <IconButton aria-label="delete">
                <CheckOutlinedIcon />
              </IconButton> */}
                <button className={classes.profileSubscribeButton}>
                  SUBSCIBE
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
