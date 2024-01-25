import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore, useFirebase } from "react-redux-firebase";
import Default from "../../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { clearOrgData, getLaunchedOrgsData } from "../../../store/actions";
import {
  getTutorialFeedIdArray,
  getTutorialFeedData
} from "../../../store/actions/tutorialPageActions";

const useStyles = makeStyles(theme => ({
  container: {
    margin: "20px 0"
  },
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column"
  },
  media: {
    height: "auto",
    maxHeight: "180px",
    minHeight: "200px",
    width: "100%"
  },
  heading: {
    padding: "10px 20px 0",
    fontSize: "1.1rem",
    fontWeight: "600"
  }
}));

const CodelabzCarousel = ({ sortBy }) => {
  const classes = useStyles();

  const tutorials = useSelector(
    ({ tutorialPage }) => tutorialPage.feed.homepageFeedArray
  ) || [0, 0, 0, 0, 0, 0];
  const profileData = useSelector(({ firebase: { profile } }) => profile);
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const firebase = useFirebase();

  useEffect(() => {
    const getFeed = async () => {
      const tutorialIdArray = await getTutorialFeedIdArray(profileData.uid)(
        firebase,
        firestore,
        dispatch
      );
      getTutorialFeedData(tutorialIdArray)(firebase, firestore, dispatch);
    };
    getFeed();
    return () => {};
  }, [firestore, dispatch]);

  console.log(tutorials);

  const getTitle = () => {
    switch (sortBy) {
      case "trending":
        return "Trending Now";
      case "featured":
        return "Featured on Codelabz";
      case "best":
        return "Best of this month";
    }
  };
  return (
    <>
      <Paper variant="outlined" className={classes.container}>
        <Typography variant="h4" className={classes.heading}>
          {getTitle()}
        </Typography>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          slidesPerView={4}
          grabCursor={true}
          loop={true}
          spaceBetween={20}
          style={{ padding: "20px 20px" }}
        >
          {tutorials.map((tutorial, i) => {
            return tutorial == 0 ? (
              <SwiperSlide>
                <Paper variant="outlined" className={classes.root}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={"100%"}
                    height={180}
                  />
                  <Skeleton width={"100%"} height={"25px"} />
                  <Skeleton width={"60%"} height={"25px"} />
                </Paper>
              </SwiperSlide>
            ) : (
              <SwiperSlide>
                <Link to={`/tutorial/${tutorial?.tutorial_id}`}>
                  <Paper variant="outlined" className={classes.root}>
                  <Card
      className={classes.root}
      style={{ marginBottom: 20, width: "100%", maxWidth: 600 }}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          alt="CodeLabz"
          component="img"
          title="CodeLabz"
          height={350}
          style={{ height: "100%" }}
          image={tutorial?.featured_image ? tutorial?.featured_image : Default}
        />
        <CardContent
          style={{
            overflow: "hidden",
            padding: 10,
          }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {tutorial?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {tutorial?.summary}
          </Typography>
        </CardContent>
        
      </CardActionArea>
    </Card>
    
                  </Paper>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Paper>
    </>
  );
};

export default CodelabzCarousel;
