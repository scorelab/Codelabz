import React, { useEffect } from "react";
import {
  Card,
  Box,
  Grid,
  Typography,
  LinearProgress,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import {
  FacebookFilled,
  TwitterSquareFilled,
  GithubFilled,
  LinkOutlined,
  LinkedinFilled,
  FlagOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearUserProfile, getUserProfileData } from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import noImageAvailable from "../../../assets/images/no-image-available.svg";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#455a64",
    },
  },
});

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
      <ThemeProvider theme={theme}>
        <LinearProgress theme={theme} />
      </ThemeProvider>
    );
  }

  return (
    <Card className="p-0">
      <Box mt={2} mb={2} m={3}>
        {profileData && (
          <div>
            <Grid container>
              <Typography gutterBottom variant="h5" component="h2">
                Profile Details
              </Typography>
            </Grid>
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
              <Grid
                xs={12}
                md={9}
                lg={9}
                className="pl-24-d pt-24-m"
                item={true}
              >
                <p>
                  <span style={{ fontSize: "1.3em", fontWeight: "bold" }}>
                    {profileData.displayName}
                  </span>
                </p>
                {checkAvailable(profileData.description) && (
                  <p className="text-justified">{profileData.description}</p>
                )}
                {checkAvailable(profileData.link_facebook) && (
                  <p>
                    <a
                      href={
                        "https://www.facebook.com/" + profileData.link_facebook
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookFilled className="facebook-color" />{" "}
                      {profileData.link_facebook}
                    </a>
                  </p>
                )}
                {checkAvailable(profileData.link_twitter) && (
                  <p>
                    <a
                      href={"https://twitter.com/" + profileData.link_twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterSquareFilled className="twitter-color" />{" "}
                      {profileData.link_twitter}
                    </a>
                  </p>
                )}
                {checkAvailable(profileData.link_github) && (
                  <p>
                    <a
                      href={"https://github.com/" + profileData.link_github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubFilled className="github-color" />{" "}
                      {profileData.link_github}
                    </a>
                  </p>
                )}
                {checkAvailable(profileData.link_linkedin) && (
                  <p>
                    <a
                      href={
                        "https://www.linkedin.com/in/" +
                        profileData.link_linkedin
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinFilled className="linkedin-color" />{" "}
                      {profileData.link_linkedin}
                    </a>
                  </p>
                )}
                {checkAvailable(profileData.website) && (
                  <p>
                    <a
                      href={profileData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkOutlined className="website-color" />{" "}
                      {profileData.website}
                    </a>
                  </p>
                )}
                {checkAvailable(profileData.country) && (
                  <p className="mb-0">
                    <a
                      href={
                        "https://www.google.com/search?q=" + profileData.country
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FlagOutlined className="website-color" />{" "}
                      {profileData.country}
                    </a>
                  </p>
                )}
              </Grid>
            </Grid>
          </div>
        )}
        {profileData === false && "No profile with the provided handle"}
      </Box>
    </Card>
  );
};

export default ProfileView;
