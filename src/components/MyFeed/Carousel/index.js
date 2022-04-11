import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { clearOrgData, getLaunchedOrgsData } from "../../../store/actions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Default from "../../../assets/images/logo.jpeg";
import useStyles from "./styles";

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

  return (
    <section className={classes.slides}>
      <ArrowBackIosIcon
        onClick={prevSlide}
        data-testid="codefeedLeftarrow"
        className={classes.arrow}
        style={{ position: "absolute", left: "-1rem" }}
      />
      <ChevronRightIcon
        onClick={nextSlide}
        data-testid="codefeedRightarrow"
        className={classes.arrow}
        style={{ position: "absolute", right: "-1rem", fontSize: "2.3rem" }}
      />

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
                      data-testid="codefeedCarouselCard"
                    >
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          alt="CodeLabz"
                          component="img"
                          title="CodeLabz"
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
