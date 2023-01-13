import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";
import { clearOrgData, getLaunchedOrgsData } from "../../../store/actions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Default from "../../../assets/images/logo.jpeg";
import useStyles from "./styles";

const Carousel = () => {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const launchedOrgs = useSelector(({ org }) => org.launched.data);
  const history = useHistory();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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

  return (
    <section className={classes.slides}>
      {launchedOrgs && launchedOrgs.length > 0 && (
        <>
          <ArrowBackIosIcon
            onClick={prevSlide}
            data-testId="codefeedLeftarrow"
            className={classes.arrow}
            style={{
              position: "absolute",
              left: "-2rem",
              opacity: length === 1 ? 0.2 : 1
            }}
          />
          <ChevronRightIcon
            onClick={nextSlide}
            data-testId="codefeedRightarrow"
            className={classes.arrow}
            style={{
              position: "absolute",
              right: "-2rem",
              fontSize: "2.3rem",
              opacity: length === 1 ? 0.2 : 1
            }}
          />
        </>
      )}

      {width > 1000 && (
        <div className={classes.slideContainer}>
          {launchedOrgs &&
            launchedOrgs.map((org, index) => {
              console.log(current, index);
              return (
                <div>
                  <Card
                    className={classes.root}
                    style={{
                      zIndex: "2",
                      width: 300,
                      transform: `translateX(${300 - current * 300}px) scale(${
                        current === index ? 1 : 0.8
                      })`,
                      transition: "all 0.5s ease-in-out",
                      filter:
                        current !== index ? "brightness(0.74) blur(2px)" : null,
                      marginTop: 20
                    }}
                    onClick={() => history.push(`/org/${org.org_handle}`)}
                  >
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
                        style={{
                          height: "17rem",
                          overflow: "hidden",
                          padding: 10
                        }}
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
                </div>
              );
            })}
        </div>
      )}

      {width <= 1000 &&
        launchedOrgs &&
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
    </section>
  );
};

export default Carousel;
