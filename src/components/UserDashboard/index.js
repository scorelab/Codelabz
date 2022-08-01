import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardComponent from "../util/CodelabCard/index";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import SideBar from "../SideBar";
import Profile from "../../assets/images/profile.svg";
import Settings from "../../assets/images/setting.svg";
import SocialMedia from "../../assets/images/social-media.svg";
import Notification from "../../assets/images/notification.svg";
import Email from "../../assets/images/email.svg";
import Password from "../../assets/images/password.svg";
import Org from "../../assets/images/org.svg";
import SwitchImg from "../../assets/images/switch.svg";
import UserForm from "../Forms/UserForm";
import UserAccount from "../Forms/UserAccount";
import ConnectSocials from "../Profile/ConnectSocials";
import UserEmail from "../Forms/UserEmail";
import UserPassword from "../Forms/UserPassword";
import Organizations from "../Forms/Organizations";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";

function UserDashboard() {
  const classes = useStyles();

  const [openMenu, setOpen] = useState(true);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };

  const history = useHistory();
  const params = useParams();

  const navlinks = [
    {
      name: "Profile",
      img: Profile,
      link: "/userdashboard/profile"
    },
    {
      name: "Settings",
      img: Settings,
      link: "/userdashboard/settings"
    },
    {
      name: "Notifications",
      img: Notification,
      link: "/userdashboard/notifications"
    },
    {
      name: "Social Media",
      img: SocialMedia,
      link: "/userdashboard/socials"
    },
    {
      name: "Emails",
      img: Email,
      link: "/userdashboard/email"
    },
    {
      name: "Password",
      img: Password,
      link: "/userdashboard/password"
    },
    {
      name: "Organizations",
      img: Org,
      link: "/userdashboard/organizations"
    }
  ];

  const notification = () => {};

  return (
    <Box className={classes.root}>
      <Box style={{ xs: { padding: 0 }, md: { padding: "0 30px" } }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              data-testId="UserAvatar"
            >
              S
            </Avatar>
            <Box marginLeft={1}>
              <Typography className={classes.name} >
                Saksham Sharma
              </Typography>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <Typography className={classes.account}>Personal account</Typography>
                <img
                  src={SwitchImg}
                  className={classes.image}
                  alt="profile"
                />
                <Typography className={classes.account} style={{ color: "#0969DA" }}>
                  Switch
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button className={classes.button}>Go to profile</Button>
        </Box>
      </Box>
      <Box
        className={classes.wrapper}
        data-testId="homepage"
        onClick={() => {
          toggleSlider();
        }}
      >
        {window.innerWidth <= 750 && openMenu && (
          <div data-testId="homepageSidebarSmall">
            <SideBar
              open={openMenu}
              toggleSlider={toggleSlider}
              notification={notification}
            />
          </div>
        )}
        <Grid item xs={6} md={3} className={classes.sidebar}>
          <SideBar
            open={openMenu}
            toggleSlider={toggleSlider}
            menuItems={navlinks}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          style={{ xs: { padding: 0 }, md: { padding: "0 20px" } }}
        >
          <Typography
            className={classes.heading}
          >
            {params.page.charAt(0).toUpperCase() + params.page.substr(1)}
          </Typography>
          <Switch>
            <Route exact path={"/userdashboard/profile"} component={UserForm} />
            <Route
              exact
              path={"/userdashboard/settings"}
              component={UserAccount}
            />
            <Route
              exact
              path={"/userdashboard/socials"}
              component={ConnectSocials}
            />
            <Route exact path={"/userdashboard/email"} component={UserEmail} />
            <Route
              exact
              path={"/userdashboard/password"}
              component={UserPassword}
            />
            <Route
              exact
              path={"/userdashboard/organizations"}
              component={Organizations}
            />
          </Switch>
        </Grid>
      </Box>
    </Box>
  );
}

export default UserDashboard;
