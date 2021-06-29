import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { clearOrgData, getLaunchedOrgsData } from "../../../store/actions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Default from "../../../assets/images/logo.jpeg";

const useStyles = makeStyles((theme) => ({
  slides: {
    height: "100%",
    width: "100%",
    display: "flex",
    // padding: "2rem",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: "2",
    boxSizing: "border-box",
  },
  image: {
    height: "20rem",
    width: "20rem",
  },
  slide: {},
  root: {
    maxWidth: 300,
    boxShadow: "0rem 2rem 2rem gray",
    animation: "$myEffectRoot 1000ms",
    minHeight: 445,
    zIndex: "2",
    minWidth: 280,
    margin: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  rootLeft: {
    maxWidth: 300,
    animation: "$myEffect 1200ms",
    height: 345,
    minWidth: 280,
    zIndex: "-1",
    position: "relative",
    left: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    filter: "brightness(0.74) blur(2px)",
  },
  rootRight: {
    maxWidth: 300,
    animation: "$myEffect 1200ms",
    height: 345,
    minWidth: 280,
    zIndex: "-1",
    position: "relative",
    right: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    filter: "brightness(0.74) blur(2px)",
  },
  media: {
    height: 140,
  },
  arrow: {
    "&:hover": {
      transform: "scale(1.2,1.2)",
    },
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 1,

      transform: "scale(.6,.6) ",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0)",
    },
  },
  "@keyframes myEffectRoot": {
    "0%": {
      opacity: 1,

      transform: "scale(.6,.6) rotateY(-100deg)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1,1) rotateY(0)",
    },
  },
}));

const Carousel = () => {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const launchedOrgs = useSelector(({ org }) => org.launched.data);
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  });
  var length = 0;
  length = launchedOrgs && launchedOrgs.length;

  useEffect(() => {
    getLaunchedOrgsData()(firestore, dispatch);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [firestore, dispatch]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // if (!Array.isArray(slides) || slides.length <= 0) {
  //   return null;
  // }

  return (
    <section className={classes.slides}>
      {/* <button
        className="left-arrow"
        onClick={prevSlide}
        style={{ position: "absolute", left: "0rem" }}
      >
        -
      </button> */}
      <ArrowBackIosIcon
        onClick={prevSlide}
        className={classes.arrow}
        style={{ position: "absolute", left: "-1rem" }}
      />
      <ChevronRightIcon
        onClick={nextSlide}
        className={classes.arrow}
        style={{ position: "absolute", right: "-1rem", fontSize: "2.3rem" }}
      />
      {/* <button
        onClick={nextSlide}
        style={{ position: "absolute", right: "0rem" }}
      >
        -
      </button> */}
      {width > 800
        ? launchedOrgs &&
          launchedOrgs.map((org, index) => {
            return (
              <Grid
                item
                className={
                  index === current ? `active ${classes.slide}` : classes.slide
                }
                key={index}
              >
                {index === (current - 1 >= 0 ? current - 1 : length - 1) && (
                  <Link to={`/org/${org.org_handle}`}>
                    <Card
                      className={classes.rootLeft}
                      style={{
                        zIndex: -1,
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          alt="CodeLabz"
                          component="img"
                          title="CodeLabz"
                          // image={org.org_image}
                          image={org.org_image ? org.org_image : Default}
                          height="50"
                          width="150"
                        />
                        <CardContent
                          style={{ height: "15rem", overflow: "hidden" }}
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                            {org.org_handle}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {org.org_description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                )}
              </Grid>
            );
          })
        : null}
      {launchedOrgs &&
        launchedOrgs.map((org, index) => {
          return (
            <Grid
              item
              className={
                index === current ? `active ${classes.slide}` : classes.slide
              }
              key={index}
            >
              {index === current && (
                <Link to={`/org/${org.org_handle}`}>
                  <Card className={classes.root} style={{ zIndex: "2" }}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        alt="CodeLabz"
                        component="img"
                        title="CodeLabz"
                        image={org.org_image ? org.org_image : Default}
                        height="250"
                        width="150"
                      />
                      <CardContent
                        style={{ height: "15rem", overflow: "hidden" }}
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {org.org_handle}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {org.org_description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              )}
            </Grid>
          );
        })}
      {width > 800
        ? launchedOrgs &&
          launchedOrgs.map((org, index) => {
            return (
              <Grid
                item
                className={
                  index === current ? `active ${classes.slide}` : classes.slide
                }
                key={index}
              >
                {index === (current + 1 < length ? current + 1 : 0) && (
                  <Link to={`/org/${org.org_handle}`}>
                    <Card className={classes.rootRight}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          alt="CodeLabz"
                          component="img"
                          title="CodeLabz"
                          image={org.org_image ? org.org_image : Default}
                          height="250"
                          width="150"
                        />
                        <CardContent
                          style={{ height: "15rem", overflow: "hidden" }}
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                            {org.org_handle}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {org.org_description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      {/* <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions> */}
                    </Card>
                  </Link>
                )}
              </Grid>
            );
          })
        : null}
    </section>
  );
};

export default Carousel;
