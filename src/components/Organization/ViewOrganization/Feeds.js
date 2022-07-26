import { Box, Divider, Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

import ActivityList from "../../Topbar/Activity/ActivityList";
import CardComponent from "../../util/CodelabCard/index";
import { userList } from "../../HomePage/userList";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import CardWithoutPicture from "../../Card/CardWithoutPicture";

const useStyles = makeStyles((theme) => ({
  postCard: {
    width: "100%",
  },
}));

function Feeds() {
  const [List, setList] = useState(1);

  const classes = useStyles();

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
    <>
      <Divider width={"90%"}></Divider>
      <Box sx={{ marginBottom: "20px", marginTop: "20px" }}>
        <ActivityList
          value={List}
          toggle={(item) => {
            setList(item.id);
          }}
          acitvitylist={acitvitylist}
        />
      </Box>
      <Grid container spacing={3}>
        {userList.persons.map((person) => (
          <Grid item>
            <CardWithoutPicture
              className={classes.postCard}
              name={person.name}
              title={person.title}
              contentDescription={person.description}
              tags={person.tags}
              profilePic={person.profilePic}
              organizationName={person.org}
              date={person.date}
              time={person.time}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Feeds;
