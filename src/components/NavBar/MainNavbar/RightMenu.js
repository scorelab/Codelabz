import React from "react";
// import { Menu } from "antd";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../../store/actions";
import { Avatar } from "antd";
import { useAllowDashboard } from "../../../helpers/customHooks";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  CodeOutlined,
  LogoutOutlined,
  BlockOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { avatarName } from "../../../helpers/avatarName";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import Collapse from "@material-ui/core/Collapse";

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

  return (
    <Grid container>
      <Avatar
        style={{
          backgroundColor:
            profile.photoURL && profile.photoURL.length > 0
              ? "#fffff"
              : "#3AAFA9",
        }}
        size={mode === "inline" ? "default" : "large"}
        src={profile.photoURL}
        icon={
          acronym ? null : (
            <UserOutlined
              style={{ fontSize: mode === "inline" ? "1rem" : "1.4rem" }}
            />
          )
        }
        onClick={handleClick}
      >
        {acronym}
      </Avatar>
      <Collapse
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        style={{
          marginTop: "2.8rem",
        }}
      >
        {allowDashboard && (
          <MenuItem key="setting:2">
            <Link to={"/tutorials"}>
              <CodeOutlined /> My Tutorials
            </Link>
          </MenuItem>
        )}
        {allowDashboard && allowOrgs && (
          <Menu.SubMenu
            title={
              <>
                <BlockOutlined /> My Organizations
              </>
            }
          >
            <MenuItem key={`org:${-1}`} style={{ marginBottom: "4px" }}>
              <Link to={`/organization`}>
                <SettingOutlined /> Manage All
              </Link>
            </MenuItem>
            <Menu.Divider />
            {orgList}
          </Menu.SubMenu>
        )}

        {allowDashboard && <Menu.Divider />}
        {profile.displayName && profile.displayName.length > 0 && (
          <MenuItem title={profile.displayName}>{profile.displayName}</MenuItem>
        )}
        {allowDashboard && (
          <MenuItem key="setting:1">
            <Link to={"/profile"}>
              <UserOutlined /> My Profile
            </Link>
          </MenuItem>
        )}
        <MenuItem
          key="setting:4"
          onClick={() => signOut()(firebase, dispatch)}
          id={"log-out"}
        >
          <LogoutOutlined /> Log Out
        </MenuItem>
      </Collapse>
      {/* <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {allowDashboard && (
          <MenuItem key="setting:2">
            <Link to={"/tutorials"}>
              <CodeOutlined /> My Tutorials
            </Link>
          </MenuItem>
        )}

        {allowDashboard && allowOrgs && (
          <Menu.SubMenu
            title={
              <>
                <BlockOutlined /> My Organizations
              </>
            }
          >
            <MenuItem key={`org:${-1}`} style={{ marginBottom: "4px" }}>
              <Link to={`/organization`}>
                <SettingOutlined /> Manage All
              </Link>
            </MenuItem>
            <Menu.Divider />
            {orgList}
          </Menu.SubMenu>
        )}

        {allowDashboard && <Menu.Divider />}

        {profile.displayName && profile.displayName.length > 0 && (
          <Menu.ItemGroup title={profile.displayName} />
        )}

        {allowDashboard && (
          <MenuItem key="setting:1">
            <Link to={"/profile"}>
              <UserOutlined /> My Profile
            </Link>
          </MenuItem>
        )}

        <MenuItem
          key="setting:4"
          onClick={() => signOut()(firebase, dispatch)}
          id={"log-out"}
        >
          <LogoutOutlined /> Log Out
        </MenuItem>
      </Menu> */}
    </Grid>
  );
};

export default RightMenu;
