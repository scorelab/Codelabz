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
import { getTutorialData } from "../../store/actions/tutorialPageActions";
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
  }, []);
  const tutorial = useSelector(
    ({
      tutorialPage: {
        post: { data }
      }
    }) => data
  );

  const postDetails = {
    title: tutorial?.tut_title,
    org: tutorial?.org_handle,
    user: tutorial?.user_handle,
    upVote: tutorial?.upVotes,
    downVote: tutorial?.downVotes,
    published_on: tutorial?.published_on,
    tag: tutorial?.tut_tags
  };

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
                  steps={tutorial.steps}
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
          <Tutorial steps={tutorial?.steps} />
          <CommentBox />
        </Grid>

        <Grid item className={classes.sideBody} xs={3}>
          <SideBar />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TutorialPage;
