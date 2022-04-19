import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Chip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { BookmarkIcon } from "@material-ui/icons";

import Button from "@material-ui/core/Button";
import ChatIcon from "@material-ui/icons/Chat";
// import BookmarkIcon from '@mui/icons-material/Bookmark';
import useStyles from "./styles";
import PropTypes from "prop-types";

const CardComponent = ({
  title = "I made 100 more CSS loaders for your next project",
  tags = "#css #webdev #beginners #html",
  profilePic = "demoperson4.jpeg",
  org = false,
  background = "white",
}) => {
  const tagsArray = tags.split(" #");
  const classes = useStyles();
  const [logoPath, setLogoPath] = React.useState("");
  React.useEffect(() => {
    setLogoPath(org);
  }, [org]);

  return (
    <>
      <Card
        maxWidth="sm"
        className={classes.card}
        style={{ background: background }}
        data-testId="codelabzCard"
      >
        <Grid container direction="row" justify="flex-start" alignItems="left">
          <CardHeader
            data-testId="codelabzCardHeader"
            className={classes.cardHeader}
            avatar={
              <img
                src={require(`../../../assets/images/${profilePic}`).default}
                alt=""
                className={classes.avatar}
              />
            }
            title={<Typography variant="body">Demo Name</Typography>}
            titleTypographyProps={{ align: "left" }}
          />
          {org && (
            <CardHeader
              data-testId="codelabzCardHeader"
              className={classes.cardHeader}
              avatar={
                <img
                  src={require(`../../../assets/images/${profilePic}`).default}
                  alt=""
                  className={classes.avatar}
                />
              }
              title={<Typography variant="body">ScoreLab</Typography>}
              titleTypographyProps={{ align: "left" }}
            />
          )}
          <CardHeader
            data-testId="codelabzCardHeader"
            className={classes.cardHeader}
            title={
              <Typography variant="body">
                <ul>
                  <li>3 days ago</li>
                </ul>
              </Typography>
            }
            titleTypographyProps={{ align: "center", marginLeft: "5px" }}
          />
        </Grid>
        <CardContent
          data-testId="codelabzCardContent"
          className={classes.cardContent}
          style={{ padding: "0rem" }}
        >
          <Grid
            container
            alignItems="left"
            justify="flex-start"
            direction="column"
            className={classes.body}
          >
            <Grid item>
              <Typography variant="h5" gutterBottom className={classes.heading}>
                {title}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="left"
            >
              {tagsArray.map((tag) => {
                return (
                  <Chip
                    variant="body2"
                    color="textPrimary"
                    className={"mr-8 " + classes.tags}
                    label={tag}
                    style={{ marginRight: "5px" }}
                  >
                    {tag}
                  </Chip>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing className={classes.cardAction}>
          <Grid
            container
            xs={6}
            justify="left"
            direction="row"
            data-testId="codelabzCardButtonGroup"
          >
            <Grid item direction="row">
              {!org ? (
                <Grid item style={{ height: "2rem" }}>
                  <IconButton style={{ color: "red" }}>
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body" color="textPrimary">
                    222
                  </Typography>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            <Grid item>
              <IconButton aria-label="comment" style={{ color: "green" }}>
                <ChatIcon />
              </IconButton>
              {org ? (
                <Typography variant="body" color="textPrimary">
                  comment
                </Typography>
              ) : (
                <Typography variant="body" color="textPrimary">
                  20
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            xs={6}
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={3}>
              <Typography
                variant="body2"
                color="textSecondary"
                alignItems="flex-end"
                className={classes.readTime}
              >
                10 min read
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "royalblue", margin: "16px" }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.string,
  profilePic: PropTypes.string,
  org: PropTypes.bool,
  background: PropTypes.string,
};
export default CardComponent;
