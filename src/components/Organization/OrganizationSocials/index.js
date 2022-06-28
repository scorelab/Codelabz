import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import useStyles from "./styles";

const OrganizationSocials = () => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Box className={classes.row} sx={{ marginBottom: 15 }}>
          <Box className={classes.link} sx={{ padding: {xs:"6px 0px", sm:"6px 5px"} }}>
            <FacebookIcon className={classes.fb}>
              <span className="sm-text">Facebook</span>
            </FacebookIcon>
            <Typography className={classes.text}>Organization Facebook Page</Typography>
          </Box>
          <Box className={classes.link} sx={{ padding: {xs:"9px 0px", sm:"9px 5px"} }}>
            <GitHubIcon className={classes.git}>
              <span className="sm-text">Github</span>
            </GitHubIcon>
            <Typography className={classes.text}>Organization Github profile</Typography>
          </Box>
        </Box>
        <Box className={classes.row}>
          <Box className={classes.link} sx={{ padding: {xs:"9px 0px",sm:"9px 5px"} }}>
            <img
              src={GoogleImg}
              alt="google"
              className={classes.button}
            />
            <Typography className={classes.text}>Organization Google profile</Typography>
          </Box>
          <Box className={classes.link} sx={{ padding: {xs:"7px 0px",sm:"7px 5px"} }}>
            <TwitterIcon className={classes.tw}>
              <span className="sm-text">Twitter</span>
            </TwitterIcon>
            <Typography className={classes.text}>Organization Twitter account</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default OrganizationSocials
