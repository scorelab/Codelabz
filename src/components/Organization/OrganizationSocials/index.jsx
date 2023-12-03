import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import useStyles from "./styles";

const OrganizationSocials = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.row} sx={{ marginBottom: 15 }}>
          <Box
            className={classes.link}
            sx={{ padding: { xs: "6px 0px", sm: "6px 5px" } }}
            data-testId="facebookButton"
          >
            <FacebookIcon className={classes.fb}>
              <span className="sm-text">Facebook</span>
            </FacebookIcon>
            <Typography className={classes.text}>
              Organization Facebook Page
            </Typography>
          </Box>
          <Box
            className={classes.link}
            sx={{ padding: { xs: "9px 0px", sm: "9px 5px" } }}
            data-testId="githubButton"
          >
            <GitHubIcon className={classes.git}>
              <span className="sm-text">Github</span>
            </GitHubIcon>
            <Typography className={classes.text}>
              Organization Github profile
            </Typography>
          </Box>
        </Box>
        <Box className={classes.row}>
          <Box
            className={classes.link}
            sx={{ padding: { xs: "9px 0px", sm: "9px 5px" } }}
            data-testId="googleButton"
          >
            <img src={GoogleImg} alt="google" className={classes.button} />
            <Typography className={classes.text}>
              Organization Google profile
            </Typography>
          </Box>
          <Box
            className={classes.link}
            sx={{ padding: { xs: "7px 0px", sm: "7px 5px" } }}
            data-testId="twitterButton"
          >
            <TwitterIcon className={classes.tw}>
              <span className="sm-text">Twitter</span>
            </TwitterIcon>
            <Typography className={classes.text}>
              Organization Twitter account
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrganizationSocials;
