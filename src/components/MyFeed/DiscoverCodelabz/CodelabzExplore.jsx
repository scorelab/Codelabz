import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import CodelabzCarousel from "./CodelabzCarousel";
const useStyles = makeStyles(theme => ({
  container: {
    padding: "30px"
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
const CodelabzExplore = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const handleTabChange = (e, value) => {
    setSelectedTab(value);
  };

  return (
    <>
      <Box className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          Discover Codelabz
        </Typography>
        <Typography variant="h5" className={classes.subHeading}>
          Explore top rated Codelabz and find what you are looking for
        </Typography>

        <CodelabzCarousel sortBy={"trending"} />
        <CodelabzCarousel sortBy={"best"} />
        <CodelabzCarousel sortBy={"featured"} />
      </Box>
    </>
  );
};

export default CodelabzExplore;
