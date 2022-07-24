import React, { useEffect, useState } from "react";
import noImageAvailable from "../../../assets/images/no-image-available.svg";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
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
import Banner from "../../ProfileBanner/Organization";
import ActivityList from "../../Topbar/Activity/ActivityList";
import { Container, makeStyles } from "@material-ui/core";
import About from "./About";
import Feeds from "./Feeds";
import Orgusers from "../OrgUsers/OrgUsers";

const useStyles = makeStyles((theme) => ({
  acitvitylist: {
    padding: theme.spacing(1),
    backgroundColor: "#FFF",
    borderRadius: "4px",
    boxShadow: theme.shadows[3],
  },
  feedGrid: {
    paddingTop: theme.spacing(5),
  },
  sideBar: {
    padding: theme.spacing(1),
  },
}));

const ViewOrganization = () => {
  const classes = useStyles();
  const { handle } = useParams();
  const [people, setPeople] = useState([]);
  const [orgFollowed, setOrgFollowed] = useState([]);
  const [Activity, setActivity] = useState(1);
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const db = firebase.firestore();
  const profileData = useSelector(({ firebase: { profile } }) => profile);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getOrgData(handle, organizations)(firebase, firestore, dispatch);
    return () => {
      clearOrgData()(dispatch);
    };
  }, [handle, firebase, firestore, dispatch, organizations]);

  const checkAvailable = (data) => {
    return !!(data && data.length > 0);
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
      }}>
      {loading || !currentOrgData ? (
        <React.Fragment>Loading..</React.Fragment>
      ) : (
        <div>
          {currentOrgData && (
            <React.Fragment>
              <Banner
                bannerImage="https://postimg.cc/6ystr9mw"
                contributors={402}
                feed={40}
                followers={402}
                name="Apple"
                profileImage="https://i.pravatar.cc/300"
                story="Think Different"
              />
              <Container maxWidth="xl">
                <Grid container justifyContent="center">
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    md={8}
                    className={classes.feedGrid}>
                    <Grid item xs={12} container direction="column">
                      <Grid item xs={12}>
                        <ActivityList
                          acitvitylist={[
                            {
                              id: 1,
                              text: "About",
                            },
                            {
                              id: 2,
                              text: "Feeds",
                            },
                          ]}
                          toggle={(item) => {
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
                    <Grid item xs={12} md={4} className={classes.sideBar}>
                      <Box marginTop={10} />
                      <Box marginBottom={"50px"}>
                        <Orgusers
                          Users={ContributersUsers}
                          title={"Contributors"}></Orgusers>
                      </Box>
                      <Box marginBottom={"50px"}>
                        <Orgusers
                          Users={ContributersUsers}
                          title={"Contributors"}></Orgusers>
                      </Box>
                      <Box marginBottom={"50px"}>
                        <Orgusers
                          Users={ContributersUsers}
                          title={"Contributors"}></Orgusers>
                      </Box>
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
