import React, { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import SideList from "../SideBar/sidelist";
import Home from "./../../assets/images/home.svg";
import Notification from "./../../assets/images/notification.svg";
import UserSettings from "./../../assets/images/user-settings.svg";
import OrganizationSettings from "./../../assets/images/organization-settings.svg";
import Org from "./../../assets/images/org.svg";
import Profile from "./../../assets/images/profile.svg";
import Bookmark from "./../../assets/images/bookmark.svg";
import Logout from "./../../assets/images/logout.svg";
import { useSelector } from "react-redux";
import Tutorials from "./../../assets/images/tutorial.svg";
import MyFeed from "./../../assets/images/MyFeed.svg";
import { signOut } from "../../store/actions";
import { makeStyles } from "@mui/styles";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
import { useFirebase } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { useAllowDashboard } from "../../helpers/customHooks";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IoLogOutOutline } from "react-icons/io5";
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 250,
    flexShrink: 0,
    display: theme.breakpoints.down("md") ? null : "none"
  },
  drawerPaper: {
    width: 250
  },
  card: {
    margin: "0.1rem",
    padding: "0.5rem 1.5rem 0.5rem 0.5rem"
  }
}));

const SideBar = ({
  open,
  toggleSlider,
  notification,
  menuItems,
  drawWidth,
  value,
  onStateChange,
  children
}) => {
  const windowSize = useWindowSize();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const allowDashboard = useAllowDashboard();

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isMobile ? 300 :350,
    height: 340,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
  };

  //Taking out the current organization handle of the user
  const currentOrg = useSelector(
    ({
      org: {
        general: { current }
      }
    }) => current
  );

  const defaultMenu = [
    {
      name: "Home",
      img: Home,
      link: "/"
    },
    {
      name: "Notifications",
      img: Notification,
      link: "/notification"
    },
    {
      name: "User Settings",
      img: UserSettings,
      link: "/user-dashboard/user-settings"
    },
    {
      name: "Organization Settings",
      img: OrganizationSettings,
      link: "/user-dashboard/organization-settings"
    },
    {
      name: "Organizations",
      img: Org,
      link: `/org/settings/${currentOrg}`
    },
    {
      name: "My Feed",
      img: MyFeed,
      link: "/dashboard/my_feed"
    },
    {
      name: "Profile",
      img: Profile,
      link: "/profile"
    },
    {
      name: "Bookmarks",
      img: Bookmark,
      link: "/bookmarks"
    },
    {
      name: "Tutorials",
      img: Tutorials,
      link: "/tutorials"
    },
    allowDashboard && {
      name: "Logout",
      img: Logout,
      onClick: handleOpenModal
    }
  ];

  const classes = useStyles();
  return (
    <>
      {windowSize.width <= (drawWidth || 960) ? (
        <Drawer
          closable="true"
          open={open}
          anchor="right"
          onClose={toggleSlider}
          data-testId="sidebar_mobile"
          style={{ zIndex: 99999 }}
          classes={{
            root: classes.drawer,
            paper: classes.drawerPaper
          }}
          xs={12}
          md={3}
        >
          <SideList
            menuItems={menuItems || defaultMenu}
            value={value}
            onStateChange={onStateChange}
            toggleSlider={toggleSlider}
            style={{
              position: "absolute"
            }}
          >
            {children}
          </SideList>
        </Drawer>
      ) : (
        <Card className={classes.card}>
          <div data-testId="sidebar_desktop">
            <SideList
              menuItems={menuItems || defaultMenu}
              value={value}
              onStateChange={onStateChange}
            >
              {children}
            </SideList>
          </div>
        </Card>
      )}
      <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IoLogOutOutline style={{ fontSize: "120px", marginLeft: isMobile ? "100px" :"130px" }} />
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mt: isMobile? 1:2, ml:isMobile?4:8 }}>
              Oh no! You're leaving...
            </Typography>
            <Typography id="modal-modal-description" variant="h5" sx={{ mt:isMobile?0:1, ml:isMobile?9:12 }}>
              Are you sure?
            </Typography>
            <Typography>
              <Button onClick={handleCloseModal} sx={{color: "#fff", bgcolor: "#2a52be", border: "2px solid #2a52be", borderRadius: "40px", mt:isMobile?4:3 , ml:isMobile?5:8, paddingX:5, paddingY:1, '&:hover': {  bgcolor: "#2a52be",   }, }}>
                Naah,Just Kidding
                </Button>
            </Typography>
            <Typography>
              <Button onClick={() => signOut()(firebase, dispatch)} sx={{ border: "2px solid #2a52be", borderRadius: "40px", mt:isMobile?1:1, ml:isMobile?5:8, paddingX:6, paddingY:1 }}>
                Yes, Log Me Out
              </Button>
            </Typography>
          </Box>
        </Modal>
    </>
  );
};

export default SideBar;
