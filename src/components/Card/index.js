import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import ShareIcon from "@material-ui/icons/Share";
import Divider from "@material-ui/core/Divider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

import useStyles from "./styles";

const CardComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Card maxWidth="md" className={classes.card}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          title="Sougata Das"
          subheader="May25,2021"
          className={classes.header}
          titleTypographyProps={{ align: "left" }}
          subheaderTypographyProps={{ align: "left" }}
          action={
            <IconButton aria-label="settings">
              <ShareIcon />
            </IconButton>
          }
        />

        <CardContent>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Lorem Heading
              </Typography>
              <Divider light />
            </Grid>

            <Grid item>
              <Typography variant="body2" color="textSecondary">
                Lorem Tags
              </Typography>
              <Divider light full />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ChatIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default CardComponent;
