import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ActivityList from "./ActivityList";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

function Activity() {
  const [List, setList] = useState(1);

  const acitvitylist = [
    {
      id: 1,
      icon: LocalOfferIcon,
      text: "Featured",
    },
    {
      id: 2,
      icon: StarBorderIcon,
      text: "New",
    },
    {
      id: 3,
      icon: EmojiEventsIcon,
      text: "Top",
    },
  ];

  return (
    <React.Fragment>
      <Grid container>
        <Grid item sm={7}>
          <Typography variant="h6">Activity</Typography>
        </Grid>
        <Grid item sm={5}>
          <ActivityList
            value={List}
            toggle={(item) => {
              setList(item.id);
            }}
            acitvitylist={acitvitylist}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Activity;
