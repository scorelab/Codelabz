import { Card, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Textbox from "./Textbox";
import Comment from "./Comment";
import {
  addComment,
  getTutorialCommentsIdArray,
  getTutorialCommentData
} from "../../../../store/actions/tutorialPageActions";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
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

const CommentBox = ({ tutorialId }) => {
  const classes = useStyles();
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [currCommentCount, setCurrCommentCount] = useState(3);

  const addCommentLoading = useSelector(
    ({
      tutorialPage: {
        comment: { loading }
      }
    }) => loading
  );

  const addCommentError = useSelector(
    ({
      tutorialPage: {
        comment: { error }
      }
    }) => error
  );

  const commentsArray = useSelector(
    ({
      tutorialPage: {
        comment: { data }
      }
    }) => data
  );

  useEffect(() => {
    const getTutorialComments = async () => {
      const tutorialCommentsIdArray = await getTutorialCommentsIdArray(
        tutorialId
      )(firebase, firestore);

      getTutorialCommentData(tutorialCommentsIdArray)(
        firebase,
        firestore,
        dispatch
      );
    };

    getTutorialComments();
    return () => {};
  }, [firestore, dispatch]);

  const handleSubmit = async commentText => {
    const commentData = {
      content: commentText,
      replyTo: tutorialId,
      tutorial_id: tutorialId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      userId: "codelabzuser"
    };

    await addComment(commentData)(firebase, firestore, dispatch);
  };

  useEffect(() => {
    setComments(commentsArray?.slice(0, currCommentCount));
  }, [currCommentCount, commentsArray]);

  console.log(commentsArray, comments, currCommentCount);

  const increaseCommentCount = () => {
    setCurrCommentCount(state => state + 3);
  };

  return (
    <Card
      className={classes.container}
      id="comments"
      data-testId="tutorialpageComments"
    >
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        Comments({commentsArray?.length || 0})
      </Typography>
      <Textbox handleSubmit={handleSubmit} />
      <Grid container rowSpacing={2}>
        {comments?.map(comment => {
          return (
            <Grid item xs={12} key={comment.comment_id}>
              <Comment comment={comment} />
            </Grid>
          );
        })}
        <Grid item container justifyContent="center">
          {comments?.length != commentsArray?.length && (
            <Button
              sx={{ textTransform: "none", fontSize: "14px" }}
              onClick={increaseCommentCount}
            >
              + Load More
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentBox;
