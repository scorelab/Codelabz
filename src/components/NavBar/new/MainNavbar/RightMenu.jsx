import React, { useEffect } from "react";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../../../store/actions";
import Avatar from "@mui/material/Avatar";
import { useAllowDashboard } from "../../../../helpers/customHooks";
import { useDispatch, useSelector } from "react-redux";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { avatarName } from "../../../../helpers/avatarName";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles(theme => ({
  menu: {
    [theme.breakpoints.down(767)]: {
      marginLeft: "1rem",
      marginTop: "1rem"
    }
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
    display: "inline-flex"
  },
  orgicon: {
    width: "1.5rem",
    height: "1.5rem",
    fontSize: "1rem"
  }
}));

const RightMenu = ({ mode, onClick }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  //This will be responsible for closing the rightMenu automatically when route Changes
  useEffect(() => {
    setAnchorEl(null);
  }, [pathname]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const allowDashboard = useAllowDashboard();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const profile = useSelector(({ firebase }) => firebase.profile);
  const acronym = avatarName(profile.displayName);

  //Taking out the current organization handle of the user
  const currentOrg = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  //Check if this current user is attached to some organization
  const isOrgPresent = currentOrg == null ? false : true;

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

  console.log("Nav Orgs", organizations);

  const allowOrgs = organizations && organizations.length > 0;

  const orgList =
    allowOrgs > 0
      ? organizations.map((org, i) => {
          return (
            <Menu.Item key={`org:${i}`}>
              <Link to={`/org/${org.org_handle}`}>
                <Avatar src={org.org_image} size="small" className="mr-8 ml-0">
                  {avatarName(org.org_name)}
                </Avatar>{" "}
                {org.org_name}
              </Link>
            </Menu.Item>
          );
        })
      : null;

  const classes = useStyles();

  if (matches) {
    return (
      <React.Fragment>
        <List>
          {allowDashboard && (
            <ListItem key="setting:2">
              <Link to={"/tutorials"} onClick={onClick}>
                <Grid container spacing={1}>
                  <Grid item>
                    <CodeOutlinedIcon
                      style={{
                        width: "1rem",
                        height: "1rem"
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">My Tutorials</Typography>
                  </Grid>
                </Grid>
              </Link>
            </ListItem>
          )}

          {allowDashboard && allowOrgs && (
            <Accordion
              style={{
                width: "98%"
              }}
              elevation={0}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2">My Organizations</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column" spacing={1}>
                  {isOrgPresent && (
                    <Grid item>
                      <Link to={`/org/settings/${currentOrg}`}>
                        <Grid container spacing={3}>
                          <Grid item>
                            <SettingsOutlinedIcon className={classes.orgicon} />
                          </Grid>
                          <Grid item>Manage All</Grid>
                        </Grid>
                      </Link>
                    </Grid>
                  )}
                  <Divider
                    style={{
                      marginTop: "4px",
                      marginBottom: "4px"
                    }}
                  />
                  {allowOrgs > 0
                    ? organizations.map((org, i) => (
                        <Grid item>
                          <Link to={`/org/${org.org_handle}`}>
                            <Grid
                              container
                              spacing={3}
                              direction="row"
                              alignItems="center"
                            >
                              <Grid item>
                                <Avatar
                                  src={org.org_image}
                                  className={classes.orgicon}
                                >
                                  {avatarName(org.org_name)}
                                </Avatar>
                              </Grid>
                              <Grid item>{org.org_name}</Grid>
                            </Grid>
                          </Link>
                        </Grid>
                      ))
                    : null}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {profile.displayName && profile.displayName.length > 0 && (
            <ListItem style={{ color: "gray" }} disableRipple>
              {profile.displayName}
            </ListItem>
          )}
          {allowDashboard && (
            <ListItem key="setting:1">
              <Link to={"/profile"}>
                <div className={classes.secondaryColor}>
                  <PersonOutlineOutlinedIcon /> My Profile
                </div>
              </Link>
            </ListItem>
          )}

          <ListItem
            key="setting:4"
            onClick={() => signOut()(firebase, dispatch)}
            id={"log-out"}
          >
            <ExitToAppOutlinedIcon />
            <Typography
              variant="p"
              style={{
                paddingLeft: "0.5rem"
              }}
            >
              Log Out
            </Typography>
          </ListItem>
        </List>
      </React.Fragment>
    );
  }

  return (
    <Grid
      container
      style={{
        marginRight: "2rem"
      }}
    >
      <Avatar
        style={{
          backgroundColor:
            profile.photoURL && profile.photoURL.length > 0
              ? "#fffff"
              : "#3AAFA9",
          marginLeft: "1rem",
          marginBottom: ".2rem"
        }}
        size={mode === "inline" ? "default" : "medium"}
        src={profile.photoURL}
        icon={
          acronym ? null : (
            <PersonOutlineOutlinedIcon
              style={{ fontSize: mode === "inline" ? "1rem" : "1.4rem" }}
            />
          )
        }
        onClick={handleClick}
        data-testId="nav-user"
      >
        {acronym}
      </Avatar>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        style={{
          marginTop: "3rem",
          zIndex: 999999
        }}
        className={classes.menu}
        elevation={1}
      >
        {allowDashboard && (
          <MenuItem key="setting:2">
            <Link to={"/tutorials"}>
              <Grid container>
                <Grid item>
                  <CodeOutlinedIcon />
                </Grid>
                <Grid item>My Tutorials</Grid>
              </Grid>
            </Link>
          </MenuItem>
        )}
        {allowDashboard && allowOrgs && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <BlockOutlinedIcon />
              <Typography>My Organizations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="column" spacing={1}>
                {/* Issue490: We will be connecting organizations to their settings page here*/}
                {isOrgPresent && (
                  <Grid item>
                    <Link to={`/org/settings/${currentOrg}`}>
                      <Grid container spacing={3}>
                        <Grid item>
                          <SettingsOutlinedIcon className={classes.orgicon} />
                        </Grid>
                        <Grid item>Manage All</Grid>
                      </Grid>
                    </Link>
                  </Grid>
                )}

                <Divider
                  style={{
                    marginTop: "4px",
                    marginBottom: "4px"
                  }}
                />
                {allowOrgs > 0
                  ? organizations.map((org, i) => (
                      <Grid item>
                        <Link to={`/org/${org.org_handle}`}>
                          <Grid
                            container
                            spacing={3}
                            direction="row"
                            alignItems="center"
                          >
                            <Grid item>
                              <Avatar
                                src={org.org_image}
                                className={classes.orgicon}
                              >
                                {avatarName(org.org_name)}
                              </Avatar>
                            </Grid>
                            <Grid item>{org.org_name}</Grid>
                          </Grid>
                        </Link>
                      </Grid>
                    ))
                  : null}
              </Grid>
            </AccordionDetails>
          </Accordion>
        )}

        {profile.displayName && profile.displayName.length > 0 && (
          <MenuItem style={{ color: "gray" }} disableRipple>
            {profile.displayName}
          </MenuItem>
        )}
        {allowDashboard && (
          <MenuItem key="setting:1">
            <Link to={"/profile"}>
              <div className={classes.secondaryColor}>
                <PersonOutlineOutlinedIcon />
                <span>My Profile</span>
              </div>
            </Link>
          </MenuItem>
        )}
        <MenuItem
          key="setting:4"
          onClick={() => signOut()(firebase, dispatch)}
          id={"log-out"}
        >
          <ExitToAppOutlinedIcon />
          <Typography
            variant="p"
            style={{
              paddingLeft: "0.5rem"
            }}
          >
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default RightMenu;
