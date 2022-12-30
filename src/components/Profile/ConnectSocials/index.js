import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const SocialButton = ({ Icon, isLinked, ...props }) => {
  const classes = useStyles();
  return (
    <Box
      {...props}
      className={`${classes.link} ${isLinked && classes.isLinked}`}
    >
      {Icon}
      <Typography className={classes.text}>
        {isLinked ? <CheckCircleIcon className={classes.isLinkedImg} /> :null}
      </Typography>
    </Box>
  );
};

const ConnectSocials = () => {
  const classes = useStyles();
  const firebase = useFirebase();
  const history = useHistory();

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
      .then(() => {
        firebase.reloadAuth();
        history.go(0);
      })
      .catch(console.error);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.row} sx={{ marginBottom: 15 }}>
          <SocialButton
            isLinked={isProviderLinked("facebook")}
            onClick={() =>{
              if(!isProviderLinked("facebook"))linkWithProvider(new firebase.auth.FacebookAuthProvider())}
            }
            Icon={<>
              <FacebookIcon className={classes.fb}></FacebookIcon>
                <span className={classes.text}>Facebook</span>
            </>
            }
            data-testId="facebookButton"
          />

          <SocialButton
            isLinked={isProviderLinked("github")}
            onClick={() =>{
              if(!isProviderLinked("github"))linkWithProvider(new firebase.auth.GithubAuthProvider())}
            }
            Icon={<>
              <GitHubIcon className={classes.git}>
              </GitHubIcon>
              <span className={classes.text}>Github</span>
              </>
            }
            data-testId="githubButton"
          />
        </Box>
        <Box className={classes.row}>
          <SocialButton
            isLinked={isProviderLinked("google")}
            onClick={() =>{
              if(!isProviderLinked("google"))linkWithProvider(new firebase.auth.GoogleAuthProvider())}
            }
            Icon={<>
              <img src={GoogleImg} alt="google" className={classes.button} />
              <span className={classes.text}>Google</span>
              </>
            }
            data-testId="googleButton"
          />
          <SocialButton
            isLinked={isProviderLinked("twitter")}
            onClick={() =>{
              if(!isProviderLinked("twitter"))linkWithProvider(new firebase.auth.TwitterAuthProvider())}
            }
            Icon={<>
              <TwitterIcon className={classes.tw}>
              </TwitterIcon>
              
              <span className={classes.text}>Twitter</span>
              </>
            }
            data-testId="twitterButton"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConnectSocials;
