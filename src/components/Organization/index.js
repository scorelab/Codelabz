import React, { useState } from "react";
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

const Organizations = () => {
  window.scrollTo(0, 0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [SettingsMenu, setSettingsMenu] = useState(1);
  const classes = useStyles();
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  return (
    <Container maxWidth="xl">
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <SwitchAccount
            Heading="Switch Account"
            name="Shahaab Manzar"
            secondaryMail="shahaabmanzar@gmail.com"
            avatar={{
              type: "char",
              value: "S",
            }}
          />
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={2}>
            <SideBar
              menuItems={[
                {
                  id: 1,
                  name: "General",
                },
                {
                  id: 2,
                  name: "Users",
                },
                {
                  id: 3,
                  name: "Passwords",
                },
                {
                  id: 4,
                  name: "Social media",
                },
              ]}
              value={SettingsMenu}
              onStateChange={(item) => {
                setSettingsMenu(item.id);
              }}
            />
          </Grid>
          <Grid item xs={10}>
            {SettingsMenu === 1 && <React.Fragment>General</React.Fragment>}
            {SettingsMenu === 2 && <React.Fragment>Users</React.Fragment>}
            {SettingsMenu === 3 && <React.Fragment>Passwords</React.Fragment>}
            {SettingsMenu === 4 && (
              <React.Fragment>Social media</React.Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Organizations;
