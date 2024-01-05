import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import {
  clearOrgData,
  getOrgData,
  subscribeOrg,
  unSubscribeOrg
} from "../../../store/actions";
import Banner from "../../ProfileBanner/Organization";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import About from "./About";
import Feeds from "./Feeds";
import Orgusers from "../OrgUsers/OrgUsers";
import Description from "../../UserDetails/Description";
import Spinner from "../../../helpers/spinner";
import ActivityList from "../../Topbar/Activity/ActivityList";
import { BasicImage, NoImage } from "../../../helpers/images";


const useStyles = makeStyles(theme => ({
  acitvitylist: {
    padding: theme.spacing(1),
    backgroundColor: "#FFF",
    borderRadius: "4px"
    // boxShadow: theme.shadows[3]
  },
  feedGrid: {
    paddingTop: theme.spacing(5),
    width: "100%"
  },
  sideBar: {
    padding: theme.spacing(1)
  },
  grid: {
    width: "100%"
  },
  activity: {
    padding: theme.spacing(3)
  }
}));

const ViewOrganization = () => {
  const classes = useStyles();
  const { handle } = useParams();
  const [people, setPeople] = useState([]);
  const [orgFollowed, setOrgFollowed] = useState([]);
  const [Activity, setActivity] = useState(1);

  // Firebase Hooks
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const db = firebase.firestore();
  const profileData = useSelector(({ firebase: { profile } }) => profile);

  const CurrentOrg = useSelector(
    ({
      profile: {
        data: { organizations }
      },
      org: {
        general: { current }
      }
    }) => (organizations ? organizations[0] : undefined)
  );

  const aboutfeedlist = [
    {
      id: 1,
      text: "About"
    },
    {
      id: 2,
      text: "Feeds"
    }
  ];

  const ContributersUsers = [
    {
      name: "Sarfraz Alam",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300"
      }
    },
    {
      name: "Jhanvi Thakkar",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300"
      }
    },
    {
      name: "Saksham Sharma",
      designation: "GSoC 22'",
      avatar: {
        type: "image",
        value: "https://i.pravatar.cc/300"
      }
    }
  ];

  useEffect(() => {
    db.collection("org_subscribers")
      .where("org_handle", "==", handle)
      .get()
      .then(querySnapshot => {
        setPeople(querySnapshot.forEach(doc => doc.data()));
      });
  }, [db, handle]);

  useEffect(() => {
    db.collection("org_subscribers")
      .where("uid", "==", profileData.uid)
      .get()
      .then(querySnapshot => {
        setOrgFollowed(querySnapshot.forEach(doc => doc.data()));
      });
  }, [db, profileData.uid]);

  const handleOrgSubscription = async () => {
    if (!currentOrgData.userSubscription)
      await subscribeOrg(handle)(firebase, firestore, dispatch);
    else await unSubscribeOrg(handle)(firebase, firestore, dispatch);
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
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getOrgData(handle, organizations)(firebase, firestore, dispatch);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [handle, firebase, firestore, dispatch, organizations]);

  const checkAvailable = data => {
    return !!(data && data.length > 0);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F9F9F9",
        minHeight: "100vh"
      }}
    >
      {loading || !currentOrgData ? (
        <React.Fragment>
          <Spinner />
        </React.Fragment>
      ) : (
        <div>
          {currentOrgData && (
            <React.Fragment>
              <Banner
                bannerImage={currentOrgData.org_banner ? currentOrgData.org_banner : "https://i.postimg.cc/zXvv1vwL/Org-Banner-Demo.png"}
                contributors={currentOrgData.contributorsCount}
                feed={currentOrgData.feedCount}
                followers={currentOrgData.followerCount}
                name={currentOrgData.org_name}
                handle={currentOrgData.org_handle}
                profileImage={
                  currentOrgData.org_image ? currentOrgData.org_image : NoImage
                }
                story="Think Different"
                isOrgBelongsToUser={organizations.includes(handle)}
                isUserSubscribed={currentOrgData.userSubscription}
                handleOrgSubscription={handleOrgSubscription}
              >

              </Banner>
              <Container
                maxWidth="xl"
                style={{
                  marginTop: "2rem"
                }}
              >
                <Grid
                  container
                  justifyContent="center"
                  className={classes.grid}
                >
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={8}
                    className={classes.feedGrid}
                  >
                    <Grid item xs={12} container direction="column">
                      <Grid item xs={12}>
                        <ActivityList
                          acitvitylist={[
                            {
                              id: 1,
                              text: "About"
                            },
                            {
                              id: 2,
                              text: "Feeds"
                            }
                          ]}
                          toggle={item => {
                            setActivity(item.id);
                          }}
                          value={Activity}
                          classname={classes.acitvitylist}
                        />
                        {Activity === 1 && <About />}
                        {Activity === 2 && <Feeds />}
                      </Grid>
                    </Grid>
                  </Grid>
                  {Activity === 2 && (
                    <Grid
                      item
                      container
                      xs={12}
                      md={4}
                      justifyContent="flex-start"
                      direction="column"
                      spacing={5}
                      className={classes.activity}
                    >
                      <Grid item>
                        <Description
                          Heading={"Description"}
                          Content={currentOrgData.org_description}
                        />
                      </Grid>
                      <Grid item>
                        <Description
                          Heading={"CodeLabz you may like"}
                          Content={currentOrgData.org_description}
                        />
                      </Grid>
                      <Grid item>
                        <Orgusers
                          Users={ContributersUsers}
                          title={"Contributors"}
                        />
                      </Grid>
                      <Grid item>
                        <Orgusers
                          Users={ContributersUsers}
                          title={"Contributors"}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Container>
            </React.Fragment>
          )}
        </div>
      )}
      {currentOrgData === false && "No organization with the provided handle"}
    </div>
  );
};

export default ViewOrganization;
