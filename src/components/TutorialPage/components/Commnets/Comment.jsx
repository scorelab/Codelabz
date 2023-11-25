import {
  Grid,
  Typography,
  Avatar,
  Button,
  IconButton,
  Paper
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CardActions from "@mui/material/CardActions";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from "react";
import Textbox from "./Textbox";
import User from "../UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import {
  getCommentData,
  getCommentReply,
  addComment,
  addCommentLike,
} from "../../../../store/actions/tutorialPageActions";
import { get, set } from "lodash";

const useStyles = makeStyles(() => ({
  container: {
    margin: "10px 0",
    padding: "20px",
    overflow: "unset"
  },
  bold: {
    fontWeight: "600"
  },
  comments: {
    margin: "5px",
    padding: "10px 15px"
  },
  settings: {
    flexWrap: "wrap",
    marginTop: "-10px",
    padding: "0 5px"
  },
  small: {
    padding: "2px"
  }
}));

const Comment = ({ id }) => {
  const classes = useStyles();
  const [showReplyfield, setShowReplyfield] = useState(false);
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(0);
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(0);
  useState(() => {
    getCommentData(id)(firebase, firestore, dispatch);
  }, [id]);

  
  
  
  const commentsArray = useSelector(
    ({
      tutorialPage: {
        comment: { data }
      }
    }) => data
    );


    useEffect(() => {
      const loadingissue = async () => {
        let data = get(commentsArray);
        [data] = commentsArray.filter(comment => comment.comment_id == id);
        console.log("data is here na ", data);
        setCount(data?.upvotes - data?.downvotes);
       
      };
      loadingissue().then(() => setLoading(false));
    }, []);
    


    console.log("commentsarray",commentsArray);

  const [data] = commentsArray.filter(comment => comment.comment_id == id);


  const repliesArray = useSelector(
    ({
      tutorialPage: {
        comment: { replies }
      }
    }) => replies
  );

  const [replies] = repliesArray.filter(replies => replies.comment_id == id);

  const handleIncrement = async () => {
    if(isLiked==0){
      setIsLiked(n=>n+1);
      setCount(count=>count + 1);
      await addCommentLike(id,1,0)(firebase, firestore, dispatch);
    }
    else if(isLiked==-1){
      setIsLiked(n=>n+2);
      setCount(count=>count + 2);
      await addCommentLike(id,1,-1)(firebase, firestore, dispatch);
    }
    else{
      setIsLiked(n=>n-1);
      setCount(count=>count - 1);
      await addCommentLike(id,-1,0)(firebase, firestore, dispatch);
    }
  };

  const handleDecrement = async () => {
    if(isLiked==0){
      setIsLiked(n=>n-1);
      setCount(count=>count - 1);
      await addCommentLike(id,0,1)(firebase, firestore, dispatch);
    }
    else if(isLiked==1){
      setIsLiked(n=>n-2);
      setCount(count=>count - 2);
      await addCommentLike(id,-1,1)(firebase, firestore, dispatch);
    }
    else{
      setIsLiked(n=>n+1);
      setCount(count=>count +1);
      await addCommentLike(id,0,-1)(firebase, firestore, dispatch);
    }
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSubmit = comment => {
    const commentData = {
      content: comment,
      replyTo: data.comment_id,
      tutorial_id: data.tutorial_id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      userId: "codelabzuser",
      upvotes:0,
      downvotes:0
    };
    addComment(commentData)(firebase, firestore, dispatch);
  };

  return (
    data && (
      <>
        <Paper variant="outlined" className={classes.comments}>
          <Typography mb={1} sx={{ fontSize: "18px" }}>
            {data?.content}
          </Typography>
          <Grid container justifyContent="space-between">
            <User id={data?.userId} timestamp={data?.createdAt} size={"sm"} />
            <CardActions className={classes.settings} disableSpacing>
              {!showReplyfield && (
                <Button
                  onClick={() => {
                    setShowReplyfield(true);
                    getCommentReply(id)(firebase, firestore, dispatch);
                  }}
                  sx={{ textTransform: "none", fontSize: "12px" }}
                >
                  {replies?.replies?.length > 0 && replies?.replies?.length}{" "}
                  Reply
                </Button>
              )}
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
              <IconButton aria-label="share" data-testId="MoreIcon">
                <MoreVertOutlinedIcon />
              </IconButton>
            </CardActions>
          </Grid>
        </Paper>
        {showReplyfield && (
          <div style={{ margin: "10px 0 0 10px" }}>
            <Textbox type="reply" handleSubmit={handleSubmit} />
            {replies?.replies.map((id, index) => {
              return <Comment id={id} />;
            })}
          </div>
        )}
      </>
    )
  );
};

export default Comment;
