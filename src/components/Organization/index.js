import React, { useEffect, useState } from "react";
import {getUserProfileData} from './../../store/actions';
import OrgSidebar from "./OrgSidebar/orgSidebar";
import { useMediaQuery } from "react-responsive";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import OrgInfoCard from "./OrgInfoCard/orgInfoCard";
import OrgUsersCard from "./OrgUsersCard/orgUsersCard";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import SwitchAccount from "../Profile/SwitchAccount/SwitchAccount";
import { Container, makeStyles } from "@material-ui/core";
import SideList from "../SideBar/sidelist";
import SideBar from "../SideBar";
import General from "./pages/General";
import Users from "./pages/Users";
import Passwords from "./pages/Passwords";
import Socialmedia from "./pages/Socialmedia";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { unPublishOrganization } from "../../store/actions";
import { useParams } from "react-router-dom";

const Organizations = () => {

  //Set All the organisations for this user
  const [organisations, setOrganisations] = useState([]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [SettingsMenu, setSettingsMenu] = useState(1);
  const classes = useStyles();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)"
  });
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const [currentOrgUpdate, setCurrentOrgUpdate] = useState(true);
  const [currentOrgData, setCurrentOrgData] = useState({});

  const current = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  const orgs = useSelector(
 ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  useEffect(() => {
    let orgDetails = orgs.find(element => {
      return element.org_handle === current;
    });
    setCurrentOrgData(orgDetails);
    setCurrentOrgUpdate(false);
  }, [current, orgs]);

  const unpublishOrganization = () => {
    setCurrentOrgUpdate(true);
    unPublishOrganization(current, currentOrgData.org_published, orgs)(
      firebase,
      firestore,
      dispatch
    );
  };

  
  //Firstly I have to find the details of the current user
  const profileData = useSelector(({firebase})=>firebase.profile);
  //Then I will fetch the organisations from the document of the current user
  const orgsOfUser = profileData.organizations;

  return (
    <Container maxWidth="xl">
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <SwitchAccount
            Heading="Switch Account"
            name={currentOrgData.org_handle}
            userOrgs = {orgsOfUser}
            avatar={{
              value: currentOrgData.org_image
            }}
            buttonText={
              currentOrgUpdate
                ? "Loading.."
                : currentOrgData.org_published
                ? "Unpublish"
                : "Publish"
            }
            buttonClick={unpublishOrganization}
          />
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={2}>
            <SideBar
              menuItems={[
                {
                  id: 1,
                  name: "General",
                  datatestid: "general-menu-item"
                },
                {
                  id: 2,
                  name: "Users",
                  datatestid: "users-menu-item"
                },
                {
                  id: 3,
                  name: "Passwords",
                  datatestid: "passwords-menu-item"
                },
                {
                  id: 4,
                  name: "Social media",
                  datatestid: "socialmedia-menu-item"
                }
              ]}
              value={SettingsMenu}
              onStateChange={item => {
                setSettingsMenu(item.id);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            {SettingsMenu === 1 && <General />}
            {SettingsMenu === 2 && <Users />}
            {SettingsMenu === 3 && <Passwords />}
            {SettingsMenu === 4 && <Socialmedia />}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Organizations;
