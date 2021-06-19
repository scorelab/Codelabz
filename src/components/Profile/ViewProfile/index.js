import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearUserProfile, getUserProfileData } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import noImageAvailable from "../../../assets/images/no-image-available.svg";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { basicTheme } from "../../../helpers/themes";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkIcon from "@material-ui/icons/Link";
import FlagIcon from "@material-ui/icons/Flag";

const ProfileView = () => {
  const { handle } = useParams();
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfileData(handle)(firebase, firestore, dispatch);
    return () => {
      clearUserProfile()(dispatch);
    };
  }, [firebase, firestore, dispatch, handle]);

  const profileData = useSelector(
    ({
      profile: {
        user: { data },
      },
    }) => data
  );
  const loading = useSelector(
    ({
      profile: {
        user: { error },
      },
    }) => error
  );

  const checkAvailable = (data) => {
    return !!(data && data.length > 0);
  };

  if (loading || !profileData) {
    return (
      <ThemeProvider theme={basicTheme}>
        <LinearProgress theme={basicTheme} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={basicTheme}>
      <Card className="p-0">
        {profileData && (
          <div>
            <Box mt={2} mb={2} m={3}>
              <Grid container>
                <span style={{ fontSize: "1.3em", fontWeight: "480" }}>Profile Details</span>
              </Grid>
            </Box>
            <Divider></Divider>
            <Box mt={2} mb={2} m={3}>
              <Grid container>
                <Grid xs={12} md={3} lg={3} item={true}>
                  {profileData.photoURL && profileData.photoURL.length > 0 ? (
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                      src={profileData.photoURL}
                      alt={profileData.displayName}
                      className="org-image"
                    />
                  ) : (
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                      src={noImageAvailable}
                      alt={"Not Available"}
                      className="org-image"
                    />
                  )}
                </Grid>
                <Grid xs={12} md={9} lg={9} className="pl-24-d pt-24-m" item={true}>
                  <p>
                    <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>{profileData.displayName}</span>
                  </p>
                  {checkAvailable(profileData.description) && <p className="text-justified">{profileData.description}</p>}
                  {checkAvailable(profileData.link_facebook) && (
                    <p>
                      <a href={"https://www.facebook.com/" + profileData.link_facebook} target="_blank" rel="noopener noreferrer">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Box mr={1}>
                            <FacebookIcon fontSize="small" className="facebook-color" />
                          </Box>{" "}
                          {profileData.link_facebook}
                        </div>
                      </a>
                    </p>
                  )}
                  {checkAvailable(profileData.link_twitter) && (
                    <p>
                      <a href={"https://twitter.com/" + profileData.link_twitter} target="_blank" rel="noopener noreferrer">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Box mr={1}>
                            <TwitterIcon fontSize="small" className="twitter-color" />{" "}
                          </Box>
                          {profileData.link_twitter}
                        </div>
                      </a>
                    </p>
                  )}
                  {checkAvailable(profileData.link_github) && (
                    <p>
                      <a href={"https://github.com/" + profileData.link_github} target="_blank" rel="noopener noreferrer">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Box mr={1}>
                            <GitHubIcon fontSize="small" className="github-color" />{" "}
                          </Box>
                          {profileData.link_github}
                        </div>
                      </a>
                    </p>
                  )}
                  {checkAvailable(profileData.link_linkedin) && (
                    <p>
                      <a href={"https://www.linkedin.com/in/" + profileData.link_linkedin} target="_blank" rel="noopener noreferrer">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Box mr={1}>
                            <LinkedInIcon fontSize="small" className="linkedin-color" />
                          </Box>{" "}
                          {profileData.link_linkedin}
                        </div>
                      </a>
                    </p>
                  )}
                  {checkAvailable(profileData.website) && (
                    <p>
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Box mr={1}>
                            <LinkIcon fontSize="small" className="website-color" />
                          </Box>{" "}
                          {profileData.website}
                        </div>
                      </a>
                    </p>
                  )}
                  {checkAvailable(profileData.country) && (
                    <p className="mb-0">
                      <a href={"https://www.google.com/search?q=" + profileData.country} target="_blank" rel="noopener noreferrer">
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Box mr={1}>
                            <FlagIcon fontSize="small" className="website-color" />{" "}
                          </Box>
                          {profileData.country}
                        </div>
                      </a>
                    </p>
                  )}
                </Grid>
              </Grid>
            </Box>
          </div>
        )}
        {profileData === false && "No profile with the provided handle"}
      </Card>
    </ThemeProvider>
  );
};

export default ProfileView;
