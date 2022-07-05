import React from "react";
import { Card, CardContent, Box, Typography, Button } from "@material-ui/core";
import GoogleImg from "../../../assets/orgs/google.png";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import useStyles from "./styles";
import OrganizationData from "../../../temp_data/Organizations.json";

const Organizations = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box className={classes.left}>
            <Box className={classes.column}>
              <img
                src={GoogleImg}
                alt="google"
                // onClick={() => signInWithGoogle()(firebase, dispatch)}
                className={classes.googleIcon}
              />
              <GitHubIcon className={classes.git}>
                <span className="sm-text">Github</span>
              </GitHubIcon>
              <TwitterIcon className={classes.tw}>
                <span className="sm-text">Twitter</span>
              </TwitterIcon>
            </Box>
            <Box className={classes.organizations} style={{ margin: "1px 0" }}>
              {OrganizationData.map((el) => (
                <Typography className={classes.organization}>
                  {el.organization}
                </Typography>
              ))}
            </Box>
            <Box className={classes.column} style={{ padding: "4px 0" }}>
              {OrganizationData.map((el) => (
                <Typography className={classes.role}>{el.role}</Typography>
              ))}
            </Box>
          </Box>
          <Box className={classes.right}>
            <Box className={classes.column}>
              <Button className={classes.button}>Settings</Button>
              <Button className={classes.button}>Settings</Button>
              <Button className={classes.button}>Settings</Button>
            </Box>
            <Box className={classes.column}>
              <Button className={classes.button}>Leave</Button>
              <Button className={classes.button}>Leave</Button>
              <Button className={classes.button}>Leave</Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Organizations;
