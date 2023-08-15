import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import PostDetails from "./components/PostDetails";
import Tutorial from "./components/Tutorial";
import CommentBox from "./components/Commnets/CommentBox";
import SideBar from "./components/sideBar";
import Grid from "@mui/material/Grid";
import useStyles from "./styles";
import StepsBar from "./StepBar";
import useWindowSize from "../../helpers/customHooks/useWindowSize";
import {
  getTutorialData,
  getTutorialSteps
} from "../../store/actions/tutorialPageActions";
import { getUserProfileData } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useParams } from "react-router-dom";

function TutorialPage({ background = "white", textColor = "black" }) {
  const classes = useStyles();
  const { id } = useParams();
  const windowSize = useWindowSize();
  const [openMenu, setOpen] = useState(false);
  const toggleSlider = () => {
    setOpen(!openMenu);
  };
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  useEffect(() => {
    getTutorialData(id)(firebase, firestore, dispatch);
    getTutorialSteps(id)(firebase, firestore, dispatch);
  }, []);
  const tutorial = useSelector(
    ({
      tutorialPage: {
        post: { data }
      }
    }) => data
  );

  const postDetails = {
    title: tutorial?.title,
    org: tutorial?.owner,
    user: tutorial?.created_by,
    upVote: tutorial?.upVotes,
    downVote: tutorial?.downVotes,
    published_on: tutorial?.createdAt,
    tag: tutorial?.tut_tags
  };

  const steps = useSelector(
    ({
      tutorialPage: {
        post: { steps }
      }
    }) => steps
  );

  return (
    <Box
      className={classes.wrapper}
      style={{ background: background }}
      data-testId="tutorialpage"
    >
      <Grid container className={classes.contentPart} justifyContent="center">
        <Grid item xs={2} className={classes.sideBody}>
          {windowSize.width > 750 && (
            <Grid
              item
              container
              className={classes.leftSideCard}
              direction="column"
              style={{
                width: "100%",
                overflow: "auto",
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none"
              }}
            >
              <Grid item className={classes.outerSideBar}>
                <StepsBar
                  open={openMenu}
                  toggleSlider={toggleSlider}
                  steps={steps}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          className={classes.mainBody}
          data-testId="homepageMainBody"
          xs={6}
        >
          <PostDetails details={postDetails} />
          <Tutorial steps={steps} />
          <CommentBox
            comments={tutorial?.comments}
            tutorialId={tutorial?.tut_id}
          />
        </Grid>

        <Grid item className={classes.sideBody} xs={3}>
          <SideBar />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TutorialPage;
