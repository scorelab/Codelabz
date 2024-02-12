import React, { useState } from "react";
import useStyles from "./styles";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
// import dp from "../../../../assets/images/demoperson1.jpeg";
import iconbuttonImage from "../../../../assets/images/Filled3dots.svg";
import { Link } from "react-router-dom";

export default function ProfileCardOne({
  profileImage,
  name,
  story,
  followers,
  following_count,
  followings,
}) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFollowingClick = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          }}
          sx={{ width: 400, bgcolor: "background.paper", p: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            Followings
          </Typography>
          <Grid container spacing={2} direction="column">
            {followings.map((following, index) => (
              <Grid
                item
                xs={6}
                key={index}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Avatar
                  alt={following?.displayName}
                  src={following?.photoURL}
                />
                <Typography>{following?.displayName}</Typography>
              </Grid>
            ))}
          </Grid>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Box>
      </Modal>
      <div
        className={classes.profileRightTop}
        data-testId="user_profile_card_one"
      >
        <div className={classes.profileCover}>
          <div className={classes.profileInfo}>
            <div>
              <img
                className={classes.profileUserImg}
                src={profileImage}
                alt="Avatar"
                data-testId="user_profile_card_one_avatar"
              />
            </div>
            <div className={classes.profileUserConnect}>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography
                    className={classes.profileInfoName}
                    data-testId="user_profile_card_one_name"
                  >
                    {name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.profileInfoStory}
                    data-testId="user_profile_card_one_story"
                  >
                    {story}
                  </Typography>
                </Grid>
                <Grid item container direction="row">
                  <Grid item>
                    <span
                      className={classes.profileInfoData}
                      style={{ marginRight: "20px" }}
                      data-testId="user_profile_card_one_follwerCount"
                    >
                      {followers} followers
                    </span>
                  </Grid>
                  <Grid item>
                    <span
                      className={classes.profileInfoData}
                      style={{ marginRight: "2px", cursor: "pointer" }}
                      data-testId="user_profile_card_one_followingCount"
                      onClick={handleFollowingClick}
                    >   
                      {following_count} following
                    </span>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  style={{ marginTop: "15px" }}
                  data-testId="user_profile_card_one_buttonGroup"
                >
                  <button
                    className={classes.profileSubscribeButton}
                    data-testId="user_profile_card_one_buttonGroup_followButton"
                  >
                    Follow
                  </button>
                  <button className={classes.profileShareButton}>Share</button>
                  <button className={classes.profileReportButton}>
                    Report
                  </button>
                  <button
                    className={classes.profileIconButton}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <img src={iconbuttonImage} alt="iconbutton" />
                  </button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button"
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                  >
                    <Link to="/user-dashboard/settings">
                      <MenuItem onClick={handleClose}>User Settings</MenuItem>
                    </Link>
                  </Menu>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
