import { Box, Divider } from "@material-ui/core";
import React, { useState } from "react";

import ActivityList from "../../Topbar/Activity/ActivityList";
import CardComponent from "../../util/CodelabCard/index";
import { userList } from "../../HomePage/userList";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import CardWithoutPicture from "../../Card/CardWithoutPicture";

function Feeds() {
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
      {userList.persons.map((person) => (
        <CardWithoutPicture
          name={person.name}
          title={person.title}
          contentDescription={person.description}
          tags={person.tags}
          profilePic={person.profilePic}
          organizationName={person.org}
          date={person.date}
          time={person.time}
        />
      ))}
    </>
  );
}

export default Feeds;
