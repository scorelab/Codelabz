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
import { useFirestore } from "react-redux-firebase";
import Default from "../../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { clearOrgData, getLaunchedOrgsData } from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  container: {
    margin: "20px 0"
  },
  root: {
    // boxShadow: "0rem 2rem 2rem gray",
    height: "100%",
    // zIndex: "2",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    transform: "scale(0.9)"
  },
  heading: {
    padding: "10px 20px 0",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  media: {
    height: "auto",
    minHeight: "100px",
    width: "100%"
  }
}));

const CodelabzCarousel = ({ sortBy }) => {
  const classes = useStyles();
  const launchedOrgs = useSelector(({ org }) => org.launched.data);
  const dispatch = useDispatch();
  const firestore = useFirestore();
  useEffect(() => {
    console.log("called");
    getLaunchedOrgsData()(firestore, dispatch);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [firestore, dispatch]);
  console.log(launchedOrgs);
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
        <Grid container alignItems="center">
          <Swiper modules={[Navigation]} navigation={true} slidesPerView={5}>
            {launchedOrgs?.map((org, i) => {
              return (
                <SwiperSlide>
                  <Paper variant="outlined" className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        alt="CodeLabz"
                        component="img"
                        title="CodeLabz"
                        image={org?.org_image ? org?.org_image : Default}
                      />
                      <CardContent
                        style={{
                          overflow: "hidden",
                          padding: 10
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {org?.org_handle}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {org?.org_description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Paper>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid>
      </Paper>
    </>
  );
};

export default CodelabzCarousel;
