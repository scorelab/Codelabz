import React, { useEffect, useState } from "react";
import { getUserProfileData } from "./../../store/actions";
import OrgSidebar from "./OrgSidebar/orgSidebar";
import { useMediaQuery } from "react-responsive";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import OrgInfoCard from "./OrgInfoCard/orgInfoCard";
import OrgUsersCard from "./OrgUsersCard/orgUsersCard";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import useStyles from "./styles";
import SwitchAccount from "../Profile/SwitchAccount/SwitchAccount";
import { Container, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideList from "../SideBar/sidelist";
import SideBar from "../SideBar";
import General from "./pages/General";
import Users from "./pages/Users";
import Passwords from "./pages/Passwords";
import Socialmedia from "./pages/Socialmedia";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { unPublishOrganization } from "../../store/actions";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
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
  const [openMenu, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const windowSize = useWindowSize();

  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

  //Firstly we have to find the details of the current user
  const profileData = useSelector(({ firebase }) => firebase.profile);
  //Then we will fetch the organisations from the document of the current user
  const orgsOfUser = profileData.organizations;

  return (
    <Container maxWidth="xl">
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <SwitchAccount
            Heading="Switch Account"
            name={currentOrgData.org_handle}
            userOrgs={orgsOfUser}
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
          {windowSize.width <= 750 ? (
            <Grid item>
              <IconButton onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                elevation={10}
                open={open}
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
                style={{
                  marginTop: "3rem",
                  zIndex: 999999
                }}
              >
                {[
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
                ].map(item => {
                  return (
                    <MenuItem
                      key={`menu-item-${item.id}`}
                      onClick={() => setSettingsMenu(item.id)}
                    >{`${item.name}`}</MenuItem>
                  );
                })}
              </Menu>
            </Grid>
          ) : (
            <Grid item container xs={2}>
              <SideBar
                toggleSlider={toggleSlider}
                open={openMenu}
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
          )}

          <Grid item xs={windowSize.width <= 750 ? 12 : 10}>
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