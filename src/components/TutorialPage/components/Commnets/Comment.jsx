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
  getCommentReply,
  addComment,
  addReply
} from "../../../../store/actions/tutorialPageActions";
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

const Comment = ({ comment }) => {
  const classes = useStyles();
  const [showReplyfield, setShowReplyfield] = useState(false);
  const [alignment, setAlignment] = React.useState("left");
  const [count, setCount] = useState(1);
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const repliesArray = useSelector(
    ({
      tutorialPage: {
        comment: { replies }
      }
    }) => replies
  );

  const [replies] = repliesArray.filter(replies => {
    if (replies?.comment_id === comment?.comment_id) {
      return replies;
    }
  });

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleClick = async () => {
    setShowReplyfield(true);
    await getCommentReply(comment?.comment_id)(firebase, firestore, dispatch);
  };

  const handleSubmit = content => {
    const commentData = {
      content: content,
      replyTo: comment?.comment_id,
      tutorial_id: comment?.tutorial_id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      userId: "codelabzuser"
    };

    if (commentData.tutorial_id === commentData.replyTo) {
      addComment(commentData)(firebase, firestore, dispatch);
    } else {
      console.log(commentData);
      addReply(commentData)(firebase, firestore, dispatch);
    }
  };

  return (
    comment && (
      <>
        <Paper variant="outlined" className={classes.comments}>
          <Typography mb={1} sx={{ fontSize: "18px" }}>
            {comment?.content}
          </Typography>
          <Grid container justifyContent="space-between">
            <User
              id={comment?.userId}
              timestamp={comment?.createdAt}
              size={"sm"}
            />
            <CardActions className={classes.settings} disableSpacing>
              {!showReplyfield && (
                <Button
                  onClick={handleClick}
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
            {replies?.replies.map(reply => {
              return <Comment comment={reply} key={reply.comment_id} />;
            })}
          </div>
        )}
      </>
    )
  );
};

export default Comment;
