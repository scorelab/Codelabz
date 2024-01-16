import React, { useState } from "react";
import useStyles from "./styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Menu, MenuItem } from "@mui/material";

// import dp from "../../../../assets/images/demoperson1.jpeg";
import iconbuttonImage from "../../../../assets/images/Filled3dots.svg";
import { Link } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CancelIcon from '@mui/icons-material/Cancel';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon,
  LinkedinIcon
} from 'react-share';

export default function ProfileCardOne({
  profileImage,
  name,
  story,
  followers,
  following
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sharePopupVisible, setSharePopUpVisible] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyToClipBoard = () => {
    const inputElement = document.getElementById('profileLinkInput');
    const copybtn =document.getElementById('copybtn')
    copybtn.textContent="copied"
    inputElement.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }
  return (
    <>
      <div
        className={classes.profileRightTop}
        data-testId="user_profile_card_one"
        onClick={()=>setSharePopUpVisible(!sharePopupVisible)}
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
                      style={{ marginRight: "2px" }}
                      data-testId="user_profile_card_one_followingCount"
                    >
                      {following} following
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
                  {sharePopupVisible ? (<>
                    <div className={classes.shareContainer} onClick={(e)=>e.stopPropagation()}>
                      <div className={classes.cancelButton} onClick={() => setSharePopUpVisible(!sharePopupVisible)}>
                        <CancelIcon style={{ width: "100%", height: "100%", color: "grey" }} />
                      </div>
                      <div className={classes.socialIconsDiv}>
                        <div className={classes.socialIcon}>
                          <FacebookShareButton url="https://www.youtube.com/">
                            <FacebookIcon size={"100%"} round={true} />
                          </FacebookShareButton>
                        </div>
                        <div className={classes.socialIcon}>
                          <TwitterShareButton url="https://www.youtube.com/">
                            <TwitterIcon size={"100%"} round={true} />
                          </TwitterShareButton>
                        </div>
                        <div className={classes.socialIcon}>
                          <WhatsappShareButton url="https://www.youtube.com/">
                            <WhatsappIcon size={"100%"} round={true} />
                          </WhatsappShareButton>
                        </div>
                        <div className={classes.socialIcon}>
                          <LinkedinShareButton url="https://www.youtube.com/">
                            <LinkedinIcon size={"100%"} round={true} />
                          </LinkedinShareButton>
                        </div>
                      </div>
                      <div className={classes.shareLinkContainer}>
                        <input type="text" id="profileLinkInput" className={classes.shareLinkContainerInput} value="<--profile link here-->" readOnly />
                        <button id="copybtn" onClick={handleCopyToClipBoard} className={classes.shareLinkContainerCopyButton}>COPY</button>
                      </div>
                    </div>
                  </>) : (<></>)}
                  <button className={classes.profileShareButton} onClick={() => setSharePopUpVisible(!sharePopupVisible)}><ShareIcon style={{ padding: "0%", width: "50%", height: "50%", marginTop: "6%" }} />Share</button>
                  <button className={classes.profileReportButton}><ReportProblemIcon style={{ padding: "0%", width: "50%", height: "50%", marginTop: "6%" }} />
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