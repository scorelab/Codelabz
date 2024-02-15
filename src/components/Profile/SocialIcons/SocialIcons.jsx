import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  icon: {
    justifyContent: "space-around"
  },
  facebookIcon: {
    color: "#4267B2"
  },
  twitterIcon: {
    color: "#1DA1F2"
  },
  linkedInIcon: {
    color: "0077B5"
  },
  blackIcon: {
    color: "#212121"
  }
}));

export default function SocialIcons(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActions className={classes.icon} disableSpacing>
        <IconButton
          color="primary"
          aria-label="share"
          data-testId="FacebookIcon"
        >
          <FacebookIcon className={classes.facebookIcon} />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="share"
          data-testId="LinkedInIcon"
        >
          <LinkedInIcon className={classes.linkedInIcon} />
        </IconButton>
        <IconButton aria-label="share" data-testId="GithubIcon">
          <GitHubIcon className={classes.blackIcon} />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="add to favorites"
          data-testId="TwitterIcon"
        >
          <TwitterIcon className={classes.twitterIcon} />
        </IconButton>
        <IconButton aria-label="share" data-testId="LinkIcon">
          <LinkIcon className={classes.blackIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
