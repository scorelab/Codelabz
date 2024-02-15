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

export default function SocialIcons(props) {
  const classes = useStyles();
  const profileData = useSelector(({ firebase: { profile } }) => profile);

  console.log(profileData)

  const openSocialMediaLink = (link) => {
    window.open(link, "_blank");
  };


  const copyPageUrlToClipboard = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl)
      .then(() => {
        alert("Profile link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying page URL to clipboard:", error);
      });
  };

  return (
    <Card className={classes.root}>
      <CardActions className={classes.icon} disableSpacing>
        {profileData?.link_facebook != "" && 
          <IconButton
            color="primary"
            aria-label="share"
            data-testId="FacebookIcon"
            onClick={() => openSocialMediaLink(`https://facebook.com/${profileData.link_facebook}`)}
          >
            <FacebookIcon className={classes.facebookIcon} />
          </IconButton>
        }
        {profileData?.link_linkedin != "" && 
          <IconButton
          color="primary"
          aria-label="share"
          data-testId="LinkedInIcon"
          onClick={() => openSocialMediaLink(`https://linkedin.com/in/${profileData.link_linkedin}`)}
          >
            <LinkedInIcon className={classes.linkedInIcon} />
          </IconButton>
        }
        {profileData?.link_github != "" &&       
          <IconButton aria-label="share" onClick={() => openSocialMediaLink(`https://github.com/${profileData.link_github}`)} data-testId="GithubIcon">
            <GitHubIcon className={classes.blackIcon} />
          </IconButton>
        }
        {profileData?.link_twitter != "" &&       
          <IconButton
            color="primary"
            aria-label="add to favorites"
            data-testId="TwitterIcon"
            onClick={() => openSocialMediaLink(`https://twitter.com/${profileData.link_twitter}`)}
          >
            <TwitterIcon className={classes.twitterIcon} />
          </IconButton>
        }
        <IconButton onClick={copyPageUrlToClipboard} aria-label="share" data-testId="LinkIcon">
          <LinkIcon className={classes.blackIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
