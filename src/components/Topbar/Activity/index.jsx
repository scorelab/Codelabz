import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ActivityList from "./ActivityList";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    padding: "8px",
    alignItems: "center"
  }
}));

function Activity() {
  const classes = useStyles();
  const [List, setList] = useState(1);

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
    }
  ];

  return (
    <React.Fragment>
      <Grid container data-testId="activityCard">
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
