import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Skeleton from "@mui/material/Skeleton";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import Default from "../../../../assets/images/logo.jpeg";
import { Link } from "react-router-dom";
import { clearOrgData, getLaunchedOrgsData } from "../../../../store/actions";

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
  }
}));

const OrgsCarousel = () => {
  const classes = useStyles();
  const launchedOrgs = useSelector(({ org }) => org.launched.data) || [
    0, 0, 0, 0, 0
  ];
  const dispatch = useDispatch();
  const firestore = useFirestore();
  useEffect(() => {
    getLaunchedOrgsData()(firestore, dispatch);
    return () => {};
  }, [firestore, dispatch]);
  return (
    <>
      <Paper variant="outlined" className={classes.container}>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          slidesPerView={4}
          grabCursor={true}
          loop={true}
          spaceBetween={20}
          style={{ padding: "20px 20px" }}
        >
          {launchedOrgs.length == 0 && <Typography>Currently there is no data to display!!</Typography>}
          {launchedOrgs.map((org, i) => {
            return org == 0 ? (
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
                <Link to={`/org/${org?.org_handle}`}>
                  <Paper variant="outlined" className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        alt="CodeLabz"
                        component="img"
                        title="CodeLabz"
                        height={350}
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
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Paper>
    </>
  );
};

export default OrgsCarousel;
