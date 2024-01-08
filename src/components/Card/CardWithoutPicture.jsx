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
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { getUserProfileData } from "../../store/actions";
const useStyles = makeStyles(theme => ({
  root: {
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
  modal: {
    opacity: 0.7,
    display: "none", // initial display state
    position: "absolute",
    top: "50vh",
    left: "62vw",
    transform: "translate(-50%, -50%)",
    padding: "2px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "15px",
    minWidth: "70px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    },
    modal1: {
      ...modal,
      
      top: "50vh",
      transform: "translate(-50%, -50%)",
      padding: "2px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "15px",
      minWidth: "70px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
  
    },
    modal2: {
      opacity: 0.7,
      left: "67vw",
      display: "none", // initial display state
      position: "absolute",
      top: "50vh",
      transform: "translate(-50%, -50%)",
      padding: "2px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "15px",
      minWidth: "70px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
  
    },
  }));

export default function CardWithoutPicture({ tutorial }) {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(0);
  const [canIncrement, setCanIncrement] = useState(true);
  const [canDecrement, setCanDecrement] = useState(true);
  const [turnedIn, setTurnedIn] = useState(false);


  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleMouseEnter = buttonType => {
    switch (buttonType) {
      case "Chat":
        setIsChatModalOpen(true);
        break;
      case "Save":
        setIsSaveModalOpen(true);
        break;
      case "Share":
        setIsShareModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = buttonType => {
    switch (buttonType) {
      case "Chat":
        setIsChatModalOpen(false);
        break;
      case "Save":
        setIsSaveModalOpen(false);
        break;
      case "Share":
        setIsShareModalOpen(false);
        break;
      default:
        break;
    }
  };

  const handleTurnedIn = () => {
    setTurnedIn(!turnedIn);
  }

  const handleIncrement = () => {
    if (canIncrement) {
      setCount(count + 1);
      setCanIncrement(false);
      setCanDecrement(true);
    }
  };

  const handleDecrement = () => {
    if (canDecrement) {
      setCount(count -1);
      setCanIncrement(true);
      setCanDecrement(false);
    }
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

  return (
    <Card className={classes.root} data-testId="codelabz">
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
      <div className={classes.modal} style={{ display: isChatModalOpen ? "block" : "none" }}>
        <p>Comments</p>
      </div>

      <div className={classes.modal1} style={{ display: isSaveModalOpen ? "block" : "none" }}>
        <p>Share</p>
      </div>

      <div className={classes.modal2} style={{ display: isShareModalOpen ? "block" : "none" }}>
        <p>Save</p>
      </div>
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
            disabled={!canIncrement}
            onClick={handleIncrement}
            value="left"
            aria-label="left aligned"
          >
            <KeyboardArrowUpIcon />
            <span>{count}</span>
          </ToggleButton>
          <ToggleButton
            className={classes.small}
            disabled={!canDecrement}
            onClick={handleDecrement}
            value="center"
            aria-label="centered"
          >
            <KeyboardArrowDownIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        
        <IconButton
          aria-label="share"
          data-testId="CommentIcon"
          className={classes.chatoutlined}
          onMouseEnter={() => handleMouseEnter("Chat")}
          onMouseLeave={() => handleMouseLeave("Chat")}
        >
          <ChatOutlinedIcon />
        </IconButton>

        <IconButton
          aria-label="add to favorites"
          data-testId="ShareIcon"
          onMouseEnter={() => handleMouseEnter("Save")}
          onMouseLeave={() => handleMouseLeave("Save")}
        >
          <ShareOutlinedIcon />
        </IconButton>

        <IconButton
          aria-label="share"
          data-testId="NotifIcon"
          onMouseEnter={() => handleMouseEnter("Share")}
          onMouseLeave={() => handleMouseLeave("Share")}
          onClick={handleTurnedIn}
        >
          {turnedIn ? <TurnedInOutlinedIcon /> : <TurnedInNotOutlinedIcon />}
        </IconButton>
        <IconButton aria-label="share" data-testId="MoreIcon">
          <MoreVertOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
