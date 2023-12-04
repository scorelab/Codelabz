import React, { useEffect, useState } from "react";
import noImageAvailable from "../../../assets/images/no-image-available.svg";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkIcon from "@mui/icons-material/Link";
import FlagIcon from "@mui/icons-material/Flag";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import {
  clearOrgData,
  getOrgData,
  addFollower,
  removeFollower
} from "../../../store/actions";

const ViewOrganization = () => {
  const { handle } = useParams();
  const [people, setPeople] = useState([]);
  const [orgFollowed, setOrgFollowed] = useState([]);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const db = firebase.firestore();
  const profileData = useSelector(({ firebase: { profile } }) => profile);

  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("cl_org_general")
      .doc(handle)
      .onSnapshot(snap => {
        const data = snap.data();
        setPeople(data.followers);
      });

    return () => unsubscribe();
  }, [db, handle]);

  useEffect(() => {
    const unsubscribe = db
      .collection("cl_user")
      .doc(profileData.uid)
      .onSnapshot(snap => {
        const data = snap.data();
        setOrgFollowed(data.orgFollowed);
      });

    return () => unsubscribe();
  }, [db, profileData.uid]);

  const addfollower = (e, people, handle, orgFollowed) => {
    e.preventDefault();
    addFollower(
      profileData.handle,
      people,
      handle,
      orgFollowed,
      profileData.uid
    )(firestore, dispatch);
  };
  const removefollower = (e, val, people, handle, orgFollowed) => {
    e.preventDefault();
    removeFollower(
      val,
      people,
      handle,
      orgFollowed,
      profileData.uid
    )(firestore, dispatch);
  };

  const loading = useSelector(
    ({
      org: {
        data: { loading }
      }
    }) => loading
  );

  const currentOrgData = useSelector(
    ({
      org: {
        data: { data }
      }
    }) => data
  );

  const organizations = useSelector(
    ({
      firebase: {
        profile: { organizations }
      }
    }) => organizations
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getOrgData(handle, organizations)(firebase, firestore, dispatch);
    setImageLoading(true);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [handle, firebase, firestore, dispatch, organizations]);

  const checkAvailable = data => {
    return !!(data && data.length > 0);
  };

  return (
    <div>
      {loading || !currentOrgData ? (
        <React.Fragment>Loading..</React.Fragment>
      ) : (
        <Card className="p-0">
          {currentOrgData && (
            <div>
              <Box mt={2} mb={2} m={3}>
                <Grid container>
                  <span style={{ fontSize: "1.3em", fontWeight: "480" }}>
                    Organization Details
                  </span>
                </Grid>
              </Box>
              <Divider></Divider>
              <Box mt={2} mb={2} m={3}>
                <Grid container>
                  <Grid xs={12} md={3} lg={3} item={true}>
                    {currentOrgData.org_image ? (
                      <>
                        <img
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            display: imageLoading ? "none" : "block"
                          }}
                          src={currentOrgData.org_image}
                          alt={currentOrgData.org_name}
                          className="org-image"
                          onLoad={() => {
                            setImageLoading(false);
                          }}
                        />
                      </>
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px"
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
                        {currentOrgData.org_name}
                      </span>
                    </p>
                    {checkAvailable(currentOrgData.org_description) && (
                      <p className="text-justified">
                        {currentOrgData.org_description}
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_facebook) && (
                      <p>
                        <a
                          href={
                            "https://www.facebook.com/" +
                            currentOrgData.org_link_facebook
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
                            <FacebookIcon
                              fontSize="small"
                              className="facebook-color"
                            />{" "}
                            {currentOrgData.org_link_facebook}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_twitter) && (
                      <p>
                        <a
                          href={
                            "https://twitter.com/" +
                            currentOrgData.org_link_twitter
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
                            <TwitterIcon
                              fontSize="small"
                              className="twitter-color"
                            />{" "}
                            {currentOrgData.org_link_twitter}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_github) && (
                      <p>
                        <a
                          href={
                            "https://github.com/" +
                            currentOrgData.org_link_github
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
                            <GitHubIcon
                              fontSize="small"
                              className="github-color"
                            />{" "}
                            {currentOrgData.org_link_github}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_link_linkedin) && (
                      <p>
                        <a
                          href={
                            "https://www.linkedin.com/in/" +
                            currentOrgData.org_link_linkedin
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
                            <LinkedInIcon
                              fontSize="small"
                              className="linkedin-color"
                            />{" "}
                            {currentOrgData.org_link_linkedin}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_website) && (
                      <p>
                        <a
                          href={currentOrgData.org_website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px"
                            }}
                          >
                            <LinkIcon
                              fontSize="small"
                              className="website-color"
                            />{" "}
                            {currentOrgData.org_website}
                          </div>
                        </a>
                      </p>
                    )}
                    {checkAvailable(currentOrgData.org_country) && (
                      <p className="mb-0">
                        <a
                          href={
                            "https://www.google.com/search?q=" +
                            currentOrgData.org_country
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
                            <FlagIcon
                              fontSize="small"
                              className="website-color"
                            />{" "}
                            {currentOrgData.org_country}
                          </div>
                          <div>
                            {!people ? (
                              <Button
                                variant="contained"
                                style={{ marginTop: "1rem" }}
                                onClick={e =>
                                  addfollower(e, people, handle, orgFollowed)
                                }
                              >
                                follow
                              </Button>
                            ) : !people.includes(profileData.handle) ? (
                              <Button
                                variant="contained"
                                style={{ marginTop: "1rem" }}
                                onClick={e =>
                                  addfollower(e, people, handle, orgFollowed)
                                }
                              >
                                follow
                              </Button>
                            ) : (
                              <Button
                                onClick={e =>
                                  removefollower(
                                    e,
                                    profileData.handle,
                                    people,
                                    handle,
                                    orgFollowed
                                  )
                                }
                                variant="contained"
                                style={{ marginTop: "1rem" }}
                              >
                                unfollow
                              </Button>
                            )}
                          </div>
                        </a>
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </div>
          )}
          {currentOrgData === false &&
            "No organization with the provided handle"}
        </Card>
      )}
    </div>
  );
};

export default ViewOrganization;
