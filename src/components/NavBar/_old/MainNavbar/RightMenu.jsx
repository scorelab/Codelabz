import React from "react";
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
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";

const useStyles = makeStyles(theme => ({
  menu: {
    [theme.breakpoints.down(767)]: {
      marginLeft: "1rem",
      marginTop: "1rem"
    }
  }
}));

const RightMenu = ({ mode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations }
      }
    }) => organizations
  );

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
      >
        {allowDashboard && (
          <MenuItem key="setting:2">
            <Link to={"/tutorials"}>
              <CodeOutlinedIcon /> My Tutorials
            </Link>
          </MenuItem>
        )}
        {allowDashboard && allowOrgs && (
          <Menu
            title={
              <>
                <BlockOutlinedIcon /> My Organizations
              </>
            }
          >
            <MenuItem key={`org:${-1}`} style={{ marginBottom: "4px" }}>
              <Link to={`/organization`}>
                <SettingsOutlinedIcon /> Manage All
              </Link>
            </MenuItem>
            <Divider></Divider>
            {orgList}
          </Menu>
        )}

        {profile.displayName && profile.displayName.length > 0 && (
          <MenuItem style={{ color: "gray" }}>{profile.displayName}</MenuItem>
        )}
        {allowDashboard && (
          <MenuItem key="setting:1">
            <Link to={"/profile"}>
              <div style={{ color: "#455A64" }}>
                <PersonOutlineOutlinedIcon /> My Profile
              </div>
            </Link>
          </MenuItem>
        )}
        <MenuItem
          key="setting:4"
          onClick={() => signOut()(firebase, dispatch)}
          id={"log-out"}
          style={{ color: "#455A64" }}
        >
          <ExitToAppOutlinedIcon /> Log Out
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default RightMenu;
