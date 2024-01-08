import React, { useEffect, useState } from "react";
import { Card, Typography, Grid, Box, Chip, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import User from "./UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { getUserProfileData } from "../../../store/actions";
import { HashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
const useStyles = makeStyles(() => ({
  container: {
    padding: "20px",
    boxSizing: "border-box"
  },
  settings: {
    flexWrap: "wrap",
    marginTop: "-10px",
    padding: "0 5px"
  },
  small: {
    padding: "2px"
  },
  chip: {
    marginLeft: "5px",
    fontWeight: "300",
    height: "20px"
  },
  bold: {
    fontWeight: "600"
  },
  chatoutlined:{
    color: "#6e6e6e"
  },
  modal: {
    opacity: 0.7,
    display: "none", // initial display state
    position: "absolute",
    top: "14vh",
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
      opacity: 0.7,
      left: "64vw",
      display: "none", // initial display state
      position: "absolute",
      top: "14vh",
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
      top: "14vh",
      transform: "translate(-50%, -50%)",
      padding: "2px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "15px",
      minWidth: "70px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
  
    }
}));



const PostDetails = ({ details }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(details.upVote - details.downVote || 0);
  const [canIncrement, setCanIncrement] = useState(true);
  const [canDecrement, setCanDecrement] = useState(true);

  const { id } = useParams();

  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [turnedIn, setTurnedIn] = useState(false);

  const handleTurnedIn = () => {
    setTurnedIn(!turnedIn);
  }

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
  useEffect(() => {
    getUserProfileData(details.user)(firebase, firestore, dispatch);
  }, [details]);

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

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const classes = useStyles();
  return (
    <>
      {details && (
        <Card className={classes.container}>
          <Grid>
            <Box>
              <Grid container columnSpacing={2} alignItems="center">
                <Grid item>
                  <Typography sx={{ fontWeight: "700", fontSize: "1.2rem" }}>
                    {details?.title}
                    {details?.tag?.map(tag => (
                      <Chip
                        label={tag}
                        variant="outlined"
                        className={classes.chip}
                      />
                    ))}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ width: "100%", marginTop: "10px" }}>
              <Grid container justifyContent="space-between" alignItems="end">
                <User
                  id={details?.user}
                  timestamp={details?.published_on}
                  showFollowButton={true}
                />

                <Grid item sx={{ width: "fit-content" }}>
                  <CardActions className={classes.settings} disableSpacing>
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
                    <div className={classes.modal} style={{ display: isChatModalOpen ? "block" : "none" }}>
        <p>Comments</p>
      </div>

      <div className={classes.modal1} style={{ display: isSaveModalOpen ? "block" : "none" }}>
        <p>Share</p>
      </div>

      <div className={classes.modal2} style={{ display: isShareModalOpen ? "block" : "none" }}>
        <p>Save</p>
      </div>
                    <HashLink to={`/tutorial/${id}#comments`}>
                    <IconButton
          aria-label="share"
          data-testId="CommentIcon"
          className={classes.chatoutlined}
          onMouseEnter={() => handleMouseEnter("Chat")}
          onMouseLeave={() => handleMouseLeave("Chat")}
        >
          <ChatOutlinedIcon />
        </IconButton>
                    </HashLink>
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
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default PostDetails;
