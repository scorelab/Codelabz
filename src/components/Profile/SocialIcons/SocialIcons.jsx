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
import { useSelector } from "react-redux";

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

export default function SocialIcons() {
  const classes = useStyles();
  const profileData = useSelector(({ firebase: { profile } }) => profile);
  const appendUsernameToUrl = (username, baseurl) => {
    return username ? `${baseurl}/${username}` : null;
  };

  const openLink = url => {
    if (url) {
      window.open(url, "_blank");
    }
  };
  return (
    <Card className={classes.root}>
      <CardActions className={classes.icon} disableSpacing>
        <IconButton
          color="primary"
          aria-label="share"
          data-testId="FacebookIcon"
          onClick={() => openLink(appendUsernameToUrl(profileData.link_facebook, 'https://www.facebook.com'))}
        >
          <FacebookIcon className={classes.facebookIcon} />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="share"
          data-testId="LinkedInIcon"
          onClick={() => openLink(appendUsernameToUrl(profileData.link_linkedin, 'https://www.linkedin.com'))}
        >
          <LinkedInIcon className={classes.linkedInIcon} />
        </IconButton>
        <IconButton
          aria-label="share"
          data-testId="GithubIcon"
          onClick={() => openLink(appendUsernameToUrl(profileData.link_github, 'https://www.github.com'))}
        >
          <GitHubIcon className={classes.blackIcon} />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="add to favorites"
          data-testId="TwitterIcon"
          onClick={() => openLink(appendUsernameToUrl(profileData.link_twitter, 'https://twitter.com'))}
        >
          <TwitterIcon className={classes.twitterIcon} />
        </IconButton>
        <IconButton aria-label="share" data-testId="LinkIcon">
          <LinkIcon
            className={classes.blackIcon}
            onClick={() => openLink(profileData.website)}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
