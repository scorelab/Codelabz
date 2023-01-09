import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ActivityList from "./ActivityList";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StarBorderIcon from "@material-ui/icons/StarBorder";
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
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "10px"
    }
  },
  card: {
    margin: "0.5rem"
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
