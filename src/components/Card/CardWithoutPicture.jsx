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
import { getUserProfileData ,addTutorialLike,getTutorialLikeCount,setTutorialLikeStatus,getTutorialLikeStatus} from "../../store/actions";
import { get, set } from "lodash";


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
  }
}));

export default function CardWithoutPicture({ tutorial }) {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState("left");
  const [count, setcount] = useState(0);
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [likestatus, setLikeStatus] = useState(false);
  const[isLoading,setIsLoading]=useState(true);

  

  const handleIncrement = async () => {
    if(likestatus==0){
      setLikeStatus(n=>n+1);
      setcount(count=>count + 1);
      await setTutorialLikeStatus(tutorial.tutorial_id,firebase.auth().currentUser.uid,1)(firebase, firestore, dispatch);
      await addTutorialLike(tutorial.tutorial_id,1,0)(firebase, firestore, dispatch);
    }
    else if(likestatus==-1){
      setLikeStatus(n=>n+2);
      setcount(count=>count + 2);
      await setTutorialLikeStatus(tutorial.tutorial_id,firebase.auth().currentUser.uid,1)(firebase, firestore, dispatch);
      await addTutorialLike(tutorial.tutorial_id,1,-1)(firebase, firestore, dispatch);
    }
    else{
      setLikeStatus(n=>n-1);
      setcount(count=>count - 1);
      await setTutorialLikeStatus(tutorial.tutorial_id,firebase.auth().currentUser.uid,0)(firebase, firestore, dispatch);
      await addTutorialLike(tutorial.tutorial_id,-1,0)(firebase, firestore, dispatch);
    }
  };

  
  const handleDecrement = async () => {
    const userId = firebase.auth().currentUser.uid;
    const tutorialId = tutorial.tutorial_id;

    if (likestatus === 0) {
      setLikeStatus(n=>n-1);
      setcount(count=>count - 1);
      await setTutorialLikeStatus(tutorialId, userId, -1)(firebase, firestore, dispatch);
      await addTutorialLike(tutorialId, 0, 1)(firebase, firestore, dispatch);
    } else if (likestatus === 1) {
      setLikeStatus(n=>n-2);
      setcount(count=>count - 2);
      await setTutorialLikeStatus(tutorialId, userId, -1)(firebase, firestore, dispatch);
      await addTutorialLike(tutorialId, -1, 1)(firebase, firestore, dispatch);
    } else {
      setLikeStatus(n=>n+1);
      setcount(count=>count + 1);
      await setTutorialLikeStatus(tutorialId, userId, 0)(firebase, firestore, dispatch);
      await addTutorialLike(tutorialId, 0, -1)(firebase, firestore, dispatch);
    }
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // 

  useEffect(() => {
    const fetchLikeStatusAndCount = async () => {
      getUserProfileData(tutorial?.created_by)(firebase, firestore, dispatch);
      const likeStatus = await getTutorialLikeStatus(tutorial.tutorial_id, firebase.auth().currentUser.uid)(firebase, firestore);
      setLikeStatus(likeStatus);
      console.log("likestatus",likeStatus);
      
      const likeCount = await getTutorialLikeCount(tutorial.tutorial_id)(firebase, firestore);
      setcount(likeCount);
      setIsLoading(false);
    };

    fetchLikeStatusAndCount();
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
  console.log("tutorial", tutorial.tutorial_id);
  console.log("data here", user)

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
          <ShareOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share" data-testId="NotifIcon">
          <TurnedInNotOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share" data-testId="MoreIcon">
          <MoreVertOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
