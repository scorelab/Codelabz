import React from "react";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../../store/actions";
import Avatar from "@material-ui/core/Avatar";
import { useAllowDashboard } from "../../../helpers/customHooks";
import { useDispatch, useSelector } from "react-redux";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { avatarName } from "../../../helpers/avatarName";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";

const RightMenu = ({ mode }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
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
  let { pathname: location } = useLocation();

  const organizations = useSelector(
    ({
      profile: {
        data: { organizations },
      },
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
  const useStyles = makeStyles((theme) => ({
    menu: {
      [theme.breakpoints.down(767)]: {
        marginLeft: "1rem",
        marginTop: "1rem",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Grid container>
      <Avatar
        style={{
          backgroundColor:
            profile.photoURL && profile.photoURL.length > 0
              ? "#fffff"
              : "#3AAFA9",
          marginLeft: "1rem",
          marginBottom: ".2rem",
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
          zIndex: 999999,
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
          <Menu.SubMenu
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
            <Menu.Divider />
            {orgList}
          </Menu.SubMenu>
        )}

        {profile.displayName && profile.displayName.length > 0 && (
          <MenuItem>{profile.displayName}</MenuItem>
        )}
        {allowDashboard && (
          <MenuItem key="setting:1">
            <Link to={"/profile"}>
              <div style={{ color: "gray", marginTop: "2rem" }}>
                <PersonOutlineOutlinedIcon style={{ marginTop: "-2rem" }} /> My
                Profile
              </div>
            </Link>
          </MenuItem>
        )}
        <MenuItem
          key="setting:4"
          onClick={() => signOut()(firebase, dispatch)}
          id={"log-out"}
        >
          <ExitToAppOutlinedIcon /> Log Out
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default RightMenu;
