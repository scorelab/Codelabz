import { Card, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Textbox from "./Textbox";
import Comment from "./Comment";
import { addComment } from "../../../../store/actions/tutorialPageActions";
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

const CommentBox = ({ comments, tutorialId }) => {
  const classes = useStyles();
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const handleSubmit = comment => {
    const commentData = {
      content: comment,
      replyTo: tutorialId,
      tutorial_id: tutorialId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      userId: "codelabzuser"
    };
    addComment(commentData)(firebase, firestore, dispatch);
  };

  return (
    <Card className={classes.container}>
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        Comments({comments?.length})
      </Typography>
      <Textbox handleSubmit={handleSubmit} />
      <Grid container rowSpacing={2}>
        {comments?.map((id, index) => {
          return (
            <Grid item xs={12}>
              <Comment id={id} key={index} />
            </Grid>
          );
        })}
        <Grid item container justifyContent="center">
          <Button sx={{ textTransform: "none", fontSize: "14px" }}>
            + Load More
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CommentBox;
