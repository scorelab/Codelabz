import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Chip from "@mui/material/Chip";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { getUserProfileData } from "../../store/actions";
import CancelIcon from '@mui/icons-material/Cancel';

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


const useStyles = makeStyles(theme => ({
  root: {
    // display:"flex",
    margin: "0.5rem",
    borderRadius: "10px",
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      width: "auto"
    },
    [theme.breakpoints.down("xs")]: {
      width: "auto"
    }
  },
  cardTopSection: {
    display: "flex",
    // border: "1px solid black",
    width: "100%",
    height: "80%",
    position: "relative"
  },
  cardBottomSection: {
    // border: "1px solid black",
    width: "100%",
    height: "20%",
    position: "relative"
  },
  cardLeftSection: {
    
    position: "relative",
    width: "50%",
    height: "100%",
    border: "none",
    borderRadius: "none",
    boxShadow: "none",
    // border:"1px solid black",
  },
  cardRightSection: {
    // border:"1px solid black",
    // marginTop:"5%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"2%",
    position: "relative",
    width: "50%",
    height: "10rem",
    border:"none",
    boxShadow:"none"
  },
  grow: {
    flexGrow: 1
  },
  margin: {
    marginRight: "5px"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  inline: {
    fontWeight: 600
  },
  contentPadding: {
    padding: "0 16px"
  },
  icon: {
    padding: "5px"
  },
  time: {
    lineHeight: "1"
  },
  small: {
    padding: "4px"
  },
  settings: {
    flexWrap: "wrap"
  },
  shareContainer: {
    width: "100%",
    height: "100%",
    // top: "50%",
    // left: "50%",

    background: "white",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    // box-shadow: ;
    borderRadius: "25px",
    // position: "absolute",
    position: "relative",
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
  },
  cancelButton: {
    position: "relative",
    width: "13%",
    height: "13%",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: "25px",
    // border:"1px solid black"
  },
  socialIconsDiv: {
    position: "relative",
    marginTop: "2%",
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border:"1px solid black",
  },
  socialIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border:"1px solid black",
    width: "40px",
    height: "40px",
    margin: "0 15px 0 15px",
    borderRadius: "50px",
    '&:hover': {
      width: "50px",
      height: "50px"
    }
  },
  shareLinkContainer: {
    width: "100%",
    display: "flex",
    height: "15%",
    // border:"1px solid black",
    position: "relative",
    justifyContent: "center",

    // padding:"0 2% 0 2%"
  },
  shareLinkContainerInput: {
    width: "60%",
    height: "80%",
    marginRight: "1%",
    textAlign: "center",
    // border:"none",
    borderRadius: "15px",
    position: "relative",
  },
  shareLinkContainerCopyButton: {
    width: "10%",
    height: "100%",
    position: "relative",
    fontSize: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#1DA1F2",
    border:"none",
    borderRadius:"2px",
    color:"white"
  }

}));

export default function CardWithoutPicture({ tutorial }) {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    getUserProfileData(tutorial?.created_by)(firebase, firestore, dispatch);
  }, [tutorial]);

  const user = useSelector(
    ({
      profile: {
        user: { data }
      }
    }) => data
  );

  const getTime = timestamp => {
    return timestamp.toDate().toDateString();
  };

  const [showSharePopUp, setShowSharePopUp] = useState(false);

  const handleCopyToClipBoard = () => {
    const inputElement = document.getElementById('profileLinkInput');
    const copybtn = document.getElementById('copybtn')
    copybtn.textContent = "copied"
    inputElement.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  }

  return (
    <Card className={classes.root} data-testId="codelabz">
      <Card className={classes.cardTopSection}>
        <Card className={classes.cardLeftSection}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {user?.photoURL && user?.photoURL.length > 0 ? (
                  <img src={user?.photoURL} />
                ) : (
                  user?.displayName[0]
                )}
              </Avatar>
            }
            title={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="h7"
                  className={classes.inline}
                  color="textPrimary"
                  data-testId="UserName"
                >
                  {user?.displayName}
                </Typography>
                {tutorial?.owner && (
                  <>
                    {" for "}
                    <Typography
                      component="span"
                      variant="h7"
                      className={classes.inline}
                      color="textPrimary"
                      data-testId="UserOrgName"
                    >
                      {tutorial?.owner}
                    </Typography>
                  </>
                )}
              </React.Fragment>
            }
            subheader={tutorial?.createdAt ? getTime(tutorial?.createdAt) : ""}
          />
          <Link to={`/tutorial/${tutorial?.tutorial_id}`}>
            <CardContent
              className={classes.contentPadding}
              data-testId="codelabzDetails"
            >
              <Typography variant="h5" color="text.primary" data-testId="Title">
                {tutorial?.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                paragraph
                data-testId="Description"
              >
                {tutorial?.summary}
              </Typography>
            </CardContent>
          </Link>
        </Card>
        <Card className={classes.cardRightSection}>
          {showSharePopUp ? <>
            <div className={classes.shareContainer} onClick={(e) => e.stopPropagation()}>
              <div className={classes.cancelButton} onClick={() => setShowSharePopUp(!showSharePopUp)}>
                <CancelIcon style={{ width: "100%", height: "100%", color: "grey" }} />
              </div>
              <div className={classes.socialIconsDiv}>
                <div className={classes.socialIcon}>
                  <FacebookShareButton url="http://www.tutorial-link.com">
                    <FacebookIcon size={"100%"} round={true} />
                  </FacebookShareButton>
                </div>
                <div className={classes.socialIcon}>
                  <TwitterShareButton url="tutorial-link">
                    <TwitterIcon size={"100%"} round={true} />
                  </TwitterShareButton>
                </div>
                <div className={classes.socialIcon}>
                  <WhatsappShareButton url="tutorial-link">
                    <WhatsappIcon size={"100%"} round={true} />
                  </WhatsappShareButton>
                </div>
                <div className={classes.socialIcon}>
                  <LinkedinShareButton url="https://github.com/scorelab/Codelabz">
                    <LinkedinIcon size={"100%"} round={true} />
                  </LinkedinShareButton>
                </div>
              </div>
              <div className={classes.shareLinkContainer}>
                <input type="text" id="profileLinkInput" className={classes.shareLinkContainerInput} value="<--tutorial link here-->" readOnly />
                <button id="copybtn" onClick={handleCopyToClipBoard} className={classes.shareLinkContainerCopyButton}>COPY</button>
              </div>
            </div>

          </> : <></>}
        </Card>
      </Card>
      <Card className={classes.cardBottomSection}>
        <CardActions className={classes.settings} disableSpacing>
          <Chip
            label="HTML"
            component="a"
            href="#chip"
            clickable
            variant="outlined"
            className={classes.margin}
          />
          <Typography
            variant="overline"
            display="block"
            className={classes.time}
            data-testId="Time"
          >
            {"10 min"}
          </Typography>
          <div className={classes.grow} />
          <ToggleButtonGroup
            size="small"
            className={classes.small}
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              className={classes.small}
              onClick={handleIncrement}
              value="left"
              aria-label="left aligned"
            >
              <KeyboardArrowUpIcon />
              <span>{count}</span>
            </ToggleButton>
            <ToggleButton
              className={classes.small}
              onClick={handleDecrement}
              value="center"
              aria-label="centered"
            >
              <KeyboardArrowDownIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <IconButton aria-label="share" data-testId="CommentIcon">
            <ChatOutlinedIcon />
          </IconButton>
          <IconButton aria-label="add to favorites" data-testId="ShareIcon">
            <ShareOutlinedIcon onClick={() => setShowSharePopUp(!showSharePopUp)} />
          </IconButton>
          <IconButton aria-label="share" data-testId="NotifIcon">
            <TurnedInNotOutlinedIcon />
          </IconButton>
          <IconButton aria-label="share" data-testId="MoreIcon">
            <MoreVertOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Card>
  );
}