import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import useStyles from "./styles";
import { signInWithGoogle, signInWithProviderID } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const SocialButton = ({ Icon, isLinked, ...props }) => {
  const classes = useStyles();
  return (
    <Box
      {...props}
      className={`${classes.link} ${isLinked ? classes.linkDisabled : ""}`}
    >
      {Icon}
      <Typography className={classes.text}>
        {isLinked ? "Connected" : "Connect"}
      </Typography>
    </Box>
  );
};

const ConnectSocials = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const providerData = useSelector(
    ({
      firebase: {
        auth: { providerData }
      }
    }) => providerData
  );

  const isProviderLinked = provider =>
    providerData.some(item => item.providerId.includes(provider));

  const linkWithProvider = provider =>
    firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .then(() => firebase.reloadAuth())
      .catch(console.log);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.row} sx={{ marginBottom: 15 }}>
          <SocialButton
            isLinked={isProviderLinked("facebook")}
            onClick={() =>
              linkWithProvider(new firebase.auth.FacebookAuthProvider())
            }
            Icon={
              <FacebookIcon className={classes.fb}>
                <span className="sm-text">Facebook</span>
              </FacebookIcon>
            }
            data-testId="facebookButton"
          />

          <SocialButton
            isLinked={isProviderLinked("github")}
            onClick={() =>
              linkWithProvider(new firebase.auth.GithubAuthProvider())
            }
            Icon={
              <GitHubIcon className={classes.git}>
                <span className="sm-text">Github</span>
              </GitHubIcon>
            }
            data-testId="githubButton"
          />
        </Box>
        <Box className={classes.row}>
          <SocialButton
            isLinked={isProviderLinked("google")}
            onClick={() =>
              linkWithProvider(new firebase.auth.GoogleAuthProvider())
            }
            Icon={
              <img src={GoogleImg} alt="google" className={classes.button} />
            }
            data-testId="googleButton"
          />
          <SocialButton
            isLinked={isProviderLinked("twitter")}
            onClick={() =>
              linkWithProvider(new firebase.auth.TwitterAuthProvider())
            }
            Icon={
              <TwitterIcon className={classes.tw}>
                <span className="sm-text">Twitter</span>
              </TwitterIcon>
            }
            data-testId="twitterButton"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConnectSocials;
