import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import useStyles from "./styles";
import { signInWithGoogle, signInWithProviderID } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Grid } from "@mui/material";

const Orgsocial = props => {
  console.log(props.toOpen);
  const classes = useStyles();

  const CurrentOrg = useSelector(
    ({
      profile: {
        data: { organizations }
      },
      org: {
        general: { current }
      }
    }) => organizations.find(element => element.org_handle === current)
  );

  const [OrgData, setOrgData] = useState(CurrentOrg);

  const dispatch = useDispatch();
  const firebase = useFirebase();

  const openSocialMedialLink = url => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.row}>
          <Grid
            className={classes.link}
            // onClick={() => signInWithProviderID("facebook")(firebase, dispatch)}
            onClick={() =>
              props.toOpen
                ? openSocialMedialLink(OrgData.org_link_facebook)
                : console.log("clicked")
            }
            data-testId="facebookButton"
          >
            <FacebookIcon className={classes.fb}>
              <span className="sm-text">Facebook</span>
            </FacebookIcon>
            <Typography className={classes.text}>
              Organization's Facebook Page
            </Typography>
          </Grid>

          <Grid
            className={classes.link}
            // onClick={() => signInWithProviderID("github")(firebase, dispatch)}
            onClick={() =>
              props.toOpen
                ? openSocialMedialLink(OrgData.org_link_github)
                : console.log("clicked")
            }
            data-testId="githubButton"
          >
            <GitHubIcon className={classes.git}>
              <span className="sm-text">Github</span>
            </GitHubIcon>
            <Typography className={classes.text}>
              Organization's Github Account
            </Typography>
          </Grid>
        </Box>
        <Box className={classes.row}>
          <Grid
            className={classes.link}
            // onClick={() => signInWithGoogle()(firebase, dispatch)}
            onClick={() =>
              props.toOpen
                ? openSocialMedialLink(OrgData.org_link_linkedin)
                : console.log("clicked")
            }
            data-testId="googleButton"
          >
            <img src={GoogleImg} alt="google" className={classes.button} />
            <Typography className={classes.text}>
              Organization's Google Account
            </Typography>
          </Grid>
          <Grid
            className={classes.link}
            // onClick={() => signInWithProviderID("twitter")(firebase, dispatch)}
            onClick={() =>
              props.toOpen
                ? openSocialMedialLink(OrgData.org_link_twitter)
                : console.log("clicked")
            }
            data-testId="twitterButton"
          >
            <TwitterIcon className={classes.tw}>
              <span className="sm-text">Twitter</span>
            </TwitterIcon>
            <Typography className={classes.text}>
              Organization's Twitter Account
            </Typography>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Orgsocial;
