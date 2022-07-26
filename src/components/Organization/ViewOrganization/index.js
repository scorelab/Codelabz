import React, { useEffect, useState } from "react";
import noImageAvailable from "../../../assets/images/no-image-available.svg";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkIcon from "@material-ui/icons/Link";
import FlagIcon from "@material-ui/icons/Flag";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import {
  clearOrgData,
  getOrgData,
  addFollower,
  removeFollower,
} from "../../../store/actions";

import Banner from "../../ProfileBanner/Organization/index";
import ActivityList from "../../Topbar/Activity/ActivityList";
import CardComponent from "../../util/CodelabCard/index";
import { userList } from "../../HomePage/userList";
import Orgusers from "../../Organization/OrgUsers/OrgUsers";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import CardWithoutPicture from "../../Card/CardWithoutPicture";
const theme = createMuiTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#455a64",
    },
  },
});

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

  const [FeedList, setFeedList] = useState(1);
  const [List, setList] = useState(1);
  const [tab, setTab] = useState(1);
  const aboutfeedlist = [
    {
      id: 1,
      text: "About",
    },
    {
      id: 2,
      text: "Feeds",
    },
  ];

  const acitvitylist = [
    {
      id: 1,
      icon: LocalOfferIcon,
      text: "Featured",
    },
    {
      id: 2,
      icon: StarBorderIcon,
      text: "New",
    },
    {
      id: 3,
      icon: EmojiEventsIcon,
      text: "Top",
    },
  ];

  const ContributersUsers = [
    {
      name: "Sarfraz Alam",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
    {
      name: "Jhanvi Thakkar",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
    {
      name: "Saksham Sharma",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300",
      },
    },
  ];

  useEffect(() => {
    const unsubscribe = db
      .collection("cl_org_general")
      .doc(handle)
      .onSnapshot((snap) => {
        const data = snap.data();
        setPeople(data.followers);
      });

    return () => unsubscribe();
  }, [db, handle]);

  useEffect(() => {
    const unsubscribe = db
      .collection("cl_user")
      .doc(profileData.uid)
      .onSnapshot((snap) => {
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
        data: { loading },
      },
    }) => loading
  );

  const currentOrgData = useSelector(
    ({
      org: {
        data: { data },
      },
    }) => data
  );

  const organizations = useSelector(
    ({
      firebase: {
        profile: { organizations },
      },
    }) => organizations
  );

  useEffect(() => {
    getOrgData(handle, organizations)(firebase, firestore, dispatch);
    setImageLoading(true);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [handle, firebase, firestore, dispatch, organizations]);

  const checkAvailable = (data) => {
    return !!(data && data.length > 0);
  };

  return (
    <ThemeProvider theme={theme}>
      {loading || !currentOrgData ? (
        <LinearProgress theme={theme} />
      ) : (
        <Card className="p-0">
          {currentOrgData && (
            <div sx={{ height: "80vh", width: "70%", margin: "auto" }}>
              <Banner></Banner>
              <Box sx={{ width: "90%", margin: "auto" }}>
                <Box mt={2} mb={2} m={3} sx={{ marginTop: "80px" }}></Box>
                <Box>
                  <Grid container direction="row">
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                      <Box sx={{ marginBottom: "20px" }}>
                        <ActivityList
                          value={FeedList}
                          toggle={(item) => {
                            setFeedList(item.id);
                            setTab(item.id);
                          }}
                          acitvitylist={aboutfeedlist}
                        />
                      </Box>
                      {tab == 1 && <>this is about page</>}
                      {tab == 2 && (
                        <>
                          <Divider width={"90%"}></Divider>
                          <Box sx={{ marginBottom: "20px", marginTop: "20px" }}>
                            <ActivityList
                              value={List}
                              toggle={(item) => {
                                setList(item.id);
                              }}
                              acitvitylist={acitvitylist}
                            />
                          </Box>
                          {userList.persons.map((person) => (
                            <CardWithoutPicture
                              name={person.name}
                              title={person.title}
                              contentDescription={person.description}
                              tags={person.tags}
                              profilePic={person.profilePic}
                              organizationName={person.org}
                              date={person.date}
                              time={person.time}
                            />
                          ))}
                        </>
                      )}
                    </Grid>
                    {tab == 2 && (
                      <>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                          <Box sx={{ marginTop: "100px" }}></Box>
                          <Box marginBottom={"50px"}>
                            <Orgusers
                              Users={ContributersUsers}
                              title={"Contributors"}
                            ></Orgusers>
                          </Box>
                          <Box marginBottom={"50px"}>
                            <Orgusers
                              Users={ContributersUsers}
                              title={"Contributors"}
                            ></Orgusers>
                          </Box>
                          <Box marginBottom={"50px"}>
                            <Orgusers
                              Users={ContributersUsers}
                              title={"Contributors"}
                            ></Orgusers>
                          </Box>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </Box>
              {/* <Divider></Divider> */}
              {/* <Box mt={2} mb={2} m={3}>
                <Grid container>
                  <Grid xs={12} md={3} lg={3} item={true}>
                    {currentOrgData.org_image ? (
                      <>
                        <img
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            display: imageLoading ? "none" : "block",
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
                              gap: "10px",
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
                              gap: "10px",
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
                              gap: "10px",
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
                              gap: "10px",
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
                              gap: "10px",
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
                              gap: "10px",
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
                                onClick={(e) =>
                                  addfollower(e, people, handle, orgFollowed)
                                }
                              >
                                follow
                              </Button>
                            ) : !people.includes(profileData.handle) ? (
                              <Button
                                variant="contained"
                                style={{ marginTop: "1rem" }}
                                onClick={(e) =>
                                  addfollower(e, people, handle, orgFollowed)
                                }
                              >
                                follow
                              </Button>
                            ) : (
                              <Button
                                onClick={(e) =>
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
              </Box> */}
            </div>
          )}
          {currentOrgData === false &&
            "No organization with the provided handle"}
        </Card>
      )}
    </ThemeProvider>
  );
};

export default ViewOrganization;
