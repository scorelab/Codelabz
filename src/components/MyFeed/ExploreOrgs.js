import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import noimage from "../../assets/images/no-image-available.svg";
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import BrandName from "../../helpers/brandName";
import { clearOrgData, getLaunchedOrgsData } from "../../store/actions";
import { CardHeader } from "@material-ui/core";
import PropTypes from "prop-types";

const ExploreOrgs = ({
  cardHeight = 450,
  cardWidth = 345,
  mediaHeight = 320,
  mediaWidth = 320,
  cardColor = "white",
}) => {
  const useStyles = makeStyles({
    root: {
      paddingBottom: 10,
    },

    card: {
      height: cardHeight,
      maxWidth: cardWidth,
      background: cardColor,
    },

    media: {
      height: mediaHeight,
      margin: "auto",
    },
  });

  const classes = useStyles();
  const loading = useSelector(({ org }) => org.launched.loading);
  const error = useSelector(({ org }) => org.launched.error);
  const launchedOrgs = useSelector(({ org }) => org.launched.data);
  const dispatch = useDispatch();
  const firestore = useFirestore();

  useEffect(() => {
    getLaunchedOrgsData()(firestore, dispatch);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [firestore, dispatch]);

  return (
    <Box m={5}>
      {loading ? (
        <div>
          <Skeleton variant="rect" width={210} height={118} />
          <Skeleton variant="rect" width={210} height={118} />
        </div>
      ) : (
        <Grid container spacing={2} align="center">
          {error ? (
            <Typography variant="body1" color="textSecondary">
              {error}
            </Typography>
          ) : (
            <>
              {launchedOrgs &&
                launchedOrgs
                  .map((a) => ({ sort: Math.random(), value: a }))
                  .sort((a, b) => a.sort - b.sort)
                  .map((a) => a.value)
                  .slice(0, 5)
                  .map((org) => (
                    <Grid
                      item={true}
                      xs={12}
                      md={6}
                      lg={3}
                      className={classes.root}
                      key={org.org_handle}
                    >
                      <Link to={`/org/${org.org_handle}`}>
                        <Card className={classes.card}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={org.org_image ? org.org_image : noimage}
                              title={org.org_name}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                              >
                                {org.org_name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                noWrap={true}
                              >
                                {org.org_description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Link>
                    </Grid>
                  ))}
              <Grid item={true} xs={12} md={6} lg={3} className={classes.root}>
                <Card>
                  <CardHeader title="Didn't find Any?" />
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">
                      Don't worry there are many organization with
                      <h1>
                        <BrandName />
                      </h1>
                    </Typography>
                    <Button
                      style={{ backgroundColor: "#0f7029", color: "white" }}
                      fullWidth
                      variant="contained"
                    >
                      Explore More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      )}
    </Box>
  );
};
ExploreOrgs.propTypes = {
  cardHeight: PropTypes.number,
  cardWidth: PropTypes.number,
  mediaHeight: PropTypes.number,
  mediaWidth: PropTypes.number,
  cardColor: PropTypes.string,
};

export default ExploreOrgs;
