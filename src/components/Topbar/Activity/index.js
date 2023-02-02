import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ActivityList from "./ActivityList";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Bookmark } from "@material-ui/icons";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    padding: "8px",
    alignItems: "center",
  }
}));

function Activity({setList,List}) {
  const classes = useStyles();
  

  const acitvitylist = [
    {
      id: 1,
      icon: LocalOfferIcon,
      text: "Featured"
    },
    {
      id: 2,
      icon: StarBorderIcon,
      text: "New"
    },
    {
      id: 3,
      icon: EmojiEventsIcon,
      text: "Top"
    },
    {
      id:4,
      icon:Bookmark,
      text:"Saved"
    }
  ];

  return (
    <React.Fragment>
        <Grid container>
          <div className={classes.root}>
            <Grid item>
              <Typography variant="h6">Activity</Typography>
            </Grid>
            <Grid item>
              <ActivityList
                value={List}
                toggle={item => {
                  setList(item.id);
                }}
                acitvitylist={acitvitylist}
              />
            </Grid>
          </div>
        </Grid>
    </React.Fragment>
  );
}

export default Activity;
