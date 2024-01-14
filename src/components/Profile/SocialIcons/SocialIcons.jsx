import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";



const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  icon: {
    justifyContent: "space-around"
  },
  facebookIcon: {
    color: "#4267B2",
    transition: "transform 0.3s ease", // Adding a smooth transition effect
    "&:hover": {
      transform: "scale(1.5)" // Increase the size by 10% on hover
    }
  },
  twitterIcon: {
    color: "#1DA1F2",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.5)"
    }
  },
  linkedInIcon: {
    color: "#0077B5",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.5)"
    }
  },
  blackIcon: {
    color: "#212121",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.5)"
    }
  }
}));


export default function SocialIcons({profileData}) {
  const classes = useStyles();

  const redirectToUserSocials=(url)=>{
    console.log("called")
    window.location.href=url
  }

  return (
    <Card className={classes.root}>
      <CardActions className={classes.icon} disableSpacing>
        <IconButton
          color="primary"
          aria-label="share"
          data-testId="FacebookIcon"
        >
          <FacebookIcon className={classes.facebookIcon} onClick={()=>redirectToUserSocials(`https://www.facebook.com/${profileData.link_github}`)}/>
        </IconButton>
        <IconButton
          color="primary"
          aria-label="share"
          data-testId="LinkedInIcon"
        >
          <LinkedInIcon className={classes.linkedInIcon} onClick={()=>redirectToUserSocials(`https://linkedin.com/${profileData.link_github}`)}/>
        </IconButton>
        <IconButton aria-label="share" data-testId="GithubIcon">
          <GitHubIcon className={classes.blackIcon} onClick={()=>redirectToUserSocials(`https://github.com/${profileData.link_github}`)} />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="add to favorites"
          data-testId="TwitterIcon"
        >
          <TwitterIcon className={classes.twitterIcon} onClick={()=>redirectToUserSocials(`https://twitter.com/${profileData.link_github}`)}/>
        </IconButton>
        <IconButton aria-label="share" data-testId="LinkIcon">
          <LinkIcon className={classes.blackIcon} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
