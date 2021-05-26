import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ShareIcon from "@material-ui/icons/Share";
import Divider from "@material-ui/core/Divider";
import ChatIcon from "@material-ui/icons/Chat";
import PersonIcon from "@material-ui/icons/Person";

import useStyles from "./styles";

const CardComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Card maxWidth="md" className={classes.card} boxShadow={3}>
        <CardHeader
          avatar={<PersonIcon style={{ fontSize: "45px" }} />}
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
          <Grid container alignItems="left" justify="center" direction="column">
            <Grid item>
              <Typography variant="h4" gutterBottom className={classes.heading}>
                Lorem Heading Heading Head
              </Typography>
            </Grid>
            <Divider light />
            <Grid item>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.tags}
              >
                #Lorem Tags1 #Lorem Tags1 #Lorem Tags1 #Lorem Tag2
              </Typography>
            </Grid>
            <Divider light full />
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Grid
            container
            xs={6}
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <Grid item direction="row">
              <IconButton aria-label="like">
                <ThumbUpAltIcon />
              </IconButton>
              <IconButton aria-label="dislike">
                <ThumbDownIcon />
              </IconButton>
              <IconButton aria-label="comment">
                <ChatIcon />
              </IconButton>
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
              >
                ..Read More
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default CardComponent;
