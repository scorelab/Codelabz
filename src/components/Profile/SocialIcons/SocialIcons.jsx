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

  useEffect(() => {
    if (!facebook.startsWith("http")) {
      setFacebook(`https://facebook.com/${facebook}`);
    }
  }, [facebook]);

  useEffect(() => {
    if (!github.startsWith("http")) {
      setGithub(`https://github.com/${github}`);
    }
  }, [github]);

  useEffect(() => {
    if (!linkedin.startsWith("http")) {
      setLinkedin(`https://linkedin.com/in/${linkedin}`);
    }
  }, [linkedin]);

  useEffect(() => {
    if (!twitter.startsWith("http")) {
      setTwitter(`https://twitter.com/${twitter}`);
    }
  }, [twitter]);
  return (
    <Card className={classes.root}>
      <CardActions className={classes.icon} disableSpacing>
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <IconButton
            color="primary"
            aria-label="share"
            data-testId="FacebookIcon"
          >
            <FacebookIcon className={classes.facebookIcon} />
          </IconButton>
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <IconButton
            color="primary"
            aria-label="share"
            data-testId="LinkedInIcon"
          >
            <LinkedInIcon className={classes.linkedInIcon} />
          </IconButton>
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <IconButton aria-label="share" data-testId="GithubIcon">
            <GitHubIcon className={classes.blackIcon} />
          </IconButton>
        </a>
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <IconButton
            color="primary"
            aria-label="add to favorites"
            data-testId="TwitterIcon"
          >
            <TwitterIcon className={classes.twitterIcon} />
          </IconButton>
        </a>
        <Link to="/" target="_blank" rel="noopener noreferrer">
          <IconButton aria-label="share" data-testId="LinkIcon">
            <LinkIcon className={classes.blackIcon} />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
