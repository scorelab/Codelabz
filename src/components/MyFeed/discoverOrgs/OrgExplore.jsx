import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Tabs, Tab, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Carousel from "../Carousel";
import OrgsCarousel from "./components/orgsCarousel";
import TagCard from "../../CardTabs/Tags";
const useStyles = makeStyles(theme => ({
  container: {
    padding: "30px 40px 0"
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "10px"
  },
  subHeading: {
    fontSize: "1rem",
    marginBottom: "10px",
    fontWeight: "400"
  }
}));
const OrgsExplore = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const [tags, setTags] = useState([
    "HTML",
    "JavaScript",
    "Css",
    "Python",
    "React",
    "Java",
    "HTML",
    "System Design",
    "Cyber Security",
    "Python",
    "Node",
    "Django",
    "C",
    "C++",
    "Python",
    "GoLang",
    "ML",
    "AI/ML",
    "Cloud",
    "DevOps",
    "Figma",
    "Angular"
  ]);

  const handleTabChange = (e, value) => {
    setSelectedTab(value);
  };

  return (
    <>
      <Box className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          Discover Organizations
        </Typography>
        <Typography variant="h5" className={classes.subHeading}>
          Explore top rated organization and find what you are looking for
        </Typography>
        <Tabs
          scrollButtons="auto"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab label="All" />
          <Tab label="Design" />
          <Tab label="JavaScript" />
          <Tab label="Web Development" />
          <Tab label="Android" />
        </Tabs>
        <OrgsCarousel />
        <Grid
          container
          alignContent="center"
          direction="column"
          style={{
            width: "100%"
          }}
          data-testId="explorePageTag"
        >
          <Grid item style={{ maxWidth: "800px" }}>
            <TagCard tags={tags} sx={{ width: "100%" }} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrgsExplore;
