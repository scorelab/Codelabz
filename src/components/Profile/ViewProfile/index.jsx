import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearUserProfile,
  getUserProfileData,
  addUserFollower,
  removeUserFollower
} from "../../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { BasicImage, NoImage } from "../../../helpers/images";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import { basicTheme } from "../../../helpers/themes";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import FlagIcon from "@mui/icons-material/Flag";
import Typography from "@mui/material/Typography";

const ProfileView = () => {
  const { handle } = useParams();
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState([]);
  const [targetUserFollowing, setTargetUserFollowing] = useState(0);
  const [following, setFollowing] = useState([]);
<<<<<<< HEAD
=======
  const [followDisable, setFollowDisable] = useState(false);
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
  const db = firebase.firestore();

  useEffect(() => {
    getUserProfileData(handle)(firebase, firestore, dispatch);
    return () => {
      clearUserProfile()(dispatch);
    };
  }, [firebase, firestore, dispatch, handle]);

  const profileData = useSelector(
    ({
      profile: {
        user: { data }
      }
    }) => data
  );
  const currentProfileData = useSelector(
    ({ firebase: { profile } }) => profile
  );
  const loading = useSelector(
    ({
      profile: {
        user: { error }
      }
    }) => error
  );

  useEffect(() => {
    const unsubscribe = db
      .collection("cl_user")
      .doc(profileData?.uid)
      .onSnapshot(snap => {
        const data = snap.data();
        setFollowers(data?.followers);
      });

    return () => unsubscribe();
  }, [profileData, db]);

  useEffect(() => {
    const unsubscribe = db
      .collection("cl_user")
      .doc(profileData?.uid)
      .onSnapshot(snap => {
        const data = snap.data();
        setTargetUserFollowing(data?.following);
      });

    return () => unsubscribe();
  }, [profileData, db]);

  useEffect(() => {
    const unsubscribe = db
      .collection("cl_user")
      .doc(currentProfileData?.uid)
      .onSnapshot(snap => {
        const data = snap.data();
        setFollowing(data?.following);
      });

    return () => unsubscribe();
  }, [currentProfileData, db]);
  const checkAvailable = data => {
    return !!(data && data.length > 0);
  };

  if (loading || !profileData) {
    return (
      <ThemeProvider theme={basicTheme}>
        <LinearProgress theme={basicTheme} />
      </ThemeProvider>
    );
  }

<<<<<<< HEAD
  const addFollower = e => {
    e.preventDefault();
    addUserFollower(
      currentProfileData,
      followers,
      following,
=======
  const addFollower = async e => {
    e.preventDefault();
	setFollowDisable(true);
    await addUserFollower(
      currentProfileData,
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
      profileData,
      firestore,
      dispatch
    );
<<<<<<< HEAD
  };

  const removeFollower = e => {
    e.preventDefault();
    removeUserFollower(
      followers,
      currentProfileData,
      following,
=======
	setFollowDisable(false);
  };

  const removeFollower = async e => {
    e.preventDefault();
	setFollowDisable(true);
    await removeUserFollower(
      currentProfileData,
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
      profileData,
      firestore,
      dispatch
    );
<<<<<<< HEAD
  };
  return (
    <ThemeProvider theme={basicTheme}>
      <Card className="p-0">
        {profileData && (
          <div>
            <Box mt={2} mb={2} m={3}>
              <Grid container>
                <span style={{ fontSize: "1.3em", fontWeight: "480" }}>
                  Profile Details
                </span>
              </Grid>
            </Box>
            <Divider></Divider>
            <Box mt={2} mb={2} m={3}>
              <Grid container>
                <Grid xs={12} md={3} lg={3} item={true}>
                  {profileData.photoURL && profileData.photoURL.length > 0
                    ? BasicImage(profileData.photoURL, profileData.displayName)
                    : BasicImage(NoImage, "Not Available")}
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
                          "https://www.facebook.com/" +
                          profileData.link_facebook
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <FacebookIcon
                              fontSize="small"
                              className="facebook-color"
                            />
                          </Box>{" "}
                          {profileData.link_facebook}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <TwitterIcon
                              fontSize="small"
                              className="twitter-color"
                            />{" "}
                          </Box>
                          {profileData.link_twitter}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <GitHubIcon
                              fontSize="small"
                              className="github-color"
                            />{" "}
                          </Box>
                          {profileData.link_github}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <LinkedInIcon
                              fontSize="small"
                              className="linkedin-color"
                            />
                          </Box>{" "}
                          {profileData.link_linkedin}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <LinkIcon
                              fontSize="small"
                              className="website-color"
                            />
                          </Box>{" "}
                          {profileData.website}
                        </div>
                      </a>
                    </p>
                  )}
                  {checkAvailable(profileData.country) && (
                    <p className="mb-0">
                      <a
                        href={
                          "https://www.google.com/search?q=" +
                          profileData.country
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <FlagIcon
                              fontSize="small"
                              className="website-color"
                            />{" "}
                          </Box>
                          {profileData.country}
                        </div>
                      </a>
                    </p>
                  )}

=======
	setFollowDisable(false);
  };

  return (
    <ThemeProvider theme={basicTheme}>
      <Card className="p-0">
        {profileData && (
          <div>
            <Box mt={2} mb={2} m={3}>
              <Grid container>
                <span style={{ fontSize: "1.3em", fontWeight: "480" }}>
                  Profile Details
                </span>
              </Grid>
            </Box>
            <Divider></Divider>
            <Box mt={2} mb={2} m={3}>
              <Grid container>
                <Grid xs={12} md={3} lg={3} item={true}>
                  {profileData.photoURL && profileData.photoURL.length > 0
                    ? BasicImage(profileData.photoURL, profileData.displayName)
                    : BasicImage(NoImage, "Not Available")}
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
                          "https://www.facebook.com/" +
                          profileData.link_facebook
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <Box mr={1}>
                            <FacebookIcon
                              fontSize="small"
                              className="facebook-color"
                            />
                          </Box>{" "}
                          {profileData.link_facebook}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <TwitterIcon
                              fontSize="small"
                              className="twitter-color"
                            />{" "}
                          </Box>
                          {profileData.link_twitter}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <GitHubIcon
                              fontSize="small"
                              className="github-color"
                            />{" "}
                          </Box>
                          {profileData.link_github}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <LinkedInIcon
                              fontSize="small"
                              className="linkedin-color"
                            />
                          </Box>{" "}
                          {profileData.link_linkedin}
                        </div>
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <LinkIcon
                              fontSize="small"
                              className="website-color"
                            />
                          </Box>{" "}
                          {profileData.website}
                        </div>
                      </a>
                    </p>
                  )}
                  {checkAvailable(profileData.country) && (
                    <p className="mb-0">
                      <a
                        href={
                          "https://www.google.com/search?q=" +
                          profileData.country
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "10px"
                          }}
                        >
                          <Box mr={1}>
                            <FlagIcon
                              fontSize="small"
                              className="website-color"
                            />{" "}
                          </Box>
                          {profileData.country}
                        </div>
                      </a>
                    </p>
                  )}

>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
                  <Typography
                    variant="body2"
                    style={{ margin: ".5rem 0 .5rem 0" }}
                  >
<<<<<<< HEAD
                    Followers : <span>{followers ? followers.length : 0}</span>{" "}
                    Following :{" "}
                    <span>
                      {targetUserFollowing ? targetUserFollowing.length : 0}
                    </span>
                  </Typography>
                  {!following ? (
=======
                    Followers : <span>{profileData.followerCount ? profileData.followerCount : 0}</span>{" "}
                    Following :{" "}
                    <span>
                      {profileData.followingCount ? profileData.followingCount : 0}
                    </span>
                  </Typography>
                  {!profileData.isFollowing ? (
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
                    <Button
                      variant="contained"
                      onClick={e => addFollower(e)}
                      style={{ marginTop: "1rem" }}
<<<<<<< HEAD
                    >
                      follow
                    </Button>
                  ) : !following.includes(profileData.handle) ? (
                    <Button variant="contained" onClick={e => addFollower(e)}>
                      follow
                    </Button>
=======
					  disabled={followDisable}
                    >
                      follow
                    </Button>
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
                  ) : (
                    <Button
                      onClick={e => removeFollower(e)}
                      variant="contained"
                      style={{ marginTop: "1rem" }}
<<<<<<< HEAD
=======
                      disabled={followDisable}
>>>>>>> 3225631bf90c2b306f0a63e4b5035d7ffef3c770
                    >
                      unfollow
                    </Button>
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
