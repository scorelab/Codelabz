import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import { clearUserProfile, getUserProfileData } from "../../../store/actions";
import { useParams, Link } from "react-router-dom";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";

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

  const { handle } = useParams();
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const getData = prop => (Boolean(prop) ? prop : "");
  const profileData = useSelector(({ firebase: { profile } }) => profile);
  const [facebook, setFacebook] = useState(getData(profileData.link_facebook));
  const [twitter, setTwitter] = useState(getData(profileData.link_twitter));
  const [linkedin, setLinkedin] = useState(getData(profileData.link_linkedin));
  const [github, setGithub] = useState(getData(profileData.link_github));

  useEffect(() => {
    getUserProfileData(handle)(firebase, firestore, dispatch);
    return () => {
      clearUserProfile()(dispatch);
    };
  }, [firebase, firestore, dispatch, handle]);
  return (
    <Card className={classes.root}>
      <CardActions className={classes.icon} disableSpacing>
        <Link to={facebook} target="_blank" rel="noopener noreferrer">
          <IconButton
            color="primary"
            aria-label="share"
            data-testId="FacebookIcon"
          >
            <FacebookIcon className={classes.facebookIcon} />
          </IconButton>
        </Link>
        <Link to={linkedin} target="_blank" rel="noopener noreferrer">
          <IconButton
            color="primary"
            aria-label="share"
            data-testId="LinkedInIcon"
          >
            <LinkedInIcon className={classes.linkedInIcon} />
          </IconButton>
        </Link>
        <Link to={github} target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="share" data-testId="GithubIcon">
            <GitHubIcon className={classes.blackIcon} />
          </IconButton>
        </Link>
        <Link to={twitter} target="_blank" rel="noopener noreferrer">
          <IconButton
            color="primary"
            aria-label="add to favorites"
            data-testId="TwitterIcon"
          >
            <TwitterIcon className={classes.twitterIcon} />
          </IconButton>
        </Link>
        <Link to="/" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="share" data-testId="LinkIcon">
            <LinkIcon className={classes.blackIcon} />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
