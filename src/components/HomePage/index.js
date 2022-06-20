import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardComponent from "../util/CodelabCard/index";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { userList } from "./userList";
import useStyles from "./styles";
import Banner from "../ProfileBanner/Organization";
import ProfileCard3 from "../ProfileBanner/profile/ProfileCard3";
import ProfileCard1 from "../ProfileBanner/profile/ProifleCard1";
import ProfileCard2 from "../ProfileBanner/profile/ProfileCard2";
function HomePage({ background = "white", textColor = "black" }) {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Banner></Banner>
    </>
  );
}

export default HomePage;
