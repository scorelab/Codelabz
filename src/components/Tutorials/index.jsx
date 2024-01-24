import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "react-responsive";
import StepsPanel from "./subComps/StepsPanel";
import ReactMarkdown from "react-markdown";
import { TutorialTimeRemaining } from "../../helpers/tutorialTime";
import ControlButtons from "./subComps/ControlButtons";
import TutorialHeading from "./subComps/TutorialTitle";
import EditControls from "./subComps/EditControls";
import Editor from "../Editor";
import ImageDrawer from "./subComps/ImageDrawer";
import StepsTitle from "./subComps/StepsTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentStepContentFromFirestore,
  getCurrentTutorialData,
  setCurrentStepNo
} from "../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import Spinner from "../../helpers/spinner";
import AddNewStepModal from "./subComps/AddNewStep";
import QuillEditor from "../Editor/QuillEditor";
import HtmlTextRenderer from "./subComps/HtmlTextRenderer";
import { Collapse, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  collapseContainer: {
    minWidth: "100%",
    "& > div > div": {
      minWidth: "100%"
    },
    overflow: "hidden",
    transition: theme.transitions.create(["width"])
  },
  widthTransition: {
    overflow: "hidden",
    transition: theme.transitions.create(["width"])
  },
  expandButton: {
    display: "flex",
    alignItems: "start",
    paddingTop: "15px"
  },
  rotateChildren: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  ExpandIcon: {
    fontSize: 50
  },
  editorContainer: {
    width: "100%",
    padding: "0 10px 10px 10px",
    overflow: "hidden",
    background: "white"
  }
}));

const ExpandMore = props => {
  const { expand, children, ...other } = props;
  const classes = useStyles({ expand });

  return (
    <Button {...other} className={classes.expandButton}>
      <div
        className={classes.rotateChildren}
        style={{ transform: !expand ? "rotate(270deg)" : "rotate(90deg)" }}
      >
        {children}
      </div>
    </Button>
  );
};

const ViewTutorial = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPanelVisible, setStepPanelVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [mode, setMode] = useState("view");
  const [allowEdit, setAllowEdit] = useState(true);
  const [imageDrawerVisible, setImageDrawerVisible] = useState(false);
  const [addNewStepModalVisible, setAddNewStepModalVisible] = useState(false);
  const [currentStepContent, setCurrentStepContent] = useState(null);
  const [stepsData, setStepData] = useState(null);
  const [tutorialData, setTutorialData] = useState(null);
  const [expand, setExpand] = useState(true);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)"
  });
  const { owner, tutorial_id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    getCurrentTutorialData(owner, tutorial_id)(firebase, firestore, dispatch);
  }, [owner, tutorial_id, firebase, firestore, dispatch]);

  const currentStepNo = useSelector(
    ({
      tutorials: {
        editor: { current_step_no }
      }
    }) => current_step_no
  );

  const currentTutorialData = useSelector(
    ({
      tutorials: {
        current: { data }
      }
    }) => data
  );

  useEffect(() => {
    if (currentTutorialData) {
      const { steps } = currentTutorialData;
      setStepData(steps);
      setTutorialData(currentTutorialData);
    }
  }, [currentTutorialData]);

  const editorStepData = useSelector(
    ({
      tutorials: {
        editor: { current_step }
      }
    }) => current_step
  );

  useEffect(() => {
    setCurrentStepContent(editorStepData);
  }, [editorStepData]);

  useEffect(() => {
    setAllowEdit(true); // remove this later
    setStepPanelVisible(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    if (stepsData) {
      setTimeRemaining(TutorialTimeRemaining(stepsData, currentStep));
      getCurrentStepContentFromFirestore(
        tutorial_id,
        stepsData[currentStep].id
      )(firestore, dispatch);
    }
  }, [tutorial_id, firebase, stepsData, currentStep, dispatch]);

  const onChange = current => {
    setCurrentStepNo(current)(dispatch);
    !isDesktop &&
      setTimeout(() => {
        setStepPanelVisible(false);
      }, 300);
  };

  useEffect(() => {
    setCurrentStep(currentStepNo);
  }, [currentStepNo]);

  if (tutorialData) {
    window.scrollTo(0, 0);
    return (
      <Grid className="row-footer-below">
        {allowEdit && (
          <Grid>
            <Grid xs={24} sm={24} md={24}>
              <EditControls
                isPublished={tutorialData.isPublished}
                stepPanelVisible={stepPanelVisible}
                isDesktop={isDesktop}
                noteID={stepsData[currentStep].id}
                setMode={mode => setMode(mode)}
                mode={mode}
                toggleImageDrawer={() => setImageDrawerVisible(true)}
                tutorial_id={tutorialData.tutorial_id}
                toggleAddNewStep={() =>
                  setAddNewStepModalVisible(!addNewStepModalVisible)
                }
                visibility={stepsData[currentStep].visibility}
                owner={owner}
                currentStep={currentStep}
                step_length={stepsData.length}
              />
            </Grid>
          </Grid>
        )}

        <Grid>
          <Grid xs={24} sm={24} md={24}>
            <TutorialHeading
              stepPanelVisible={stepPanelVisible}
              isDesktop={isDesktop}
              setStepPanelVisible={setStepPanelVisible}
              tutorialData={tutorialData}
              timeRemaining={timeRemaining}
            />
          </Grid>
        </Grid>
        <Grid className={classes.flexRow}>
          <ExpandMore
            data-testid="tutorial-collapse-button"
            expand={expand}
            onClick={() => {
              setExpand(prev => !prev);
              setStepPanelVisible(prev => !prev);
            }}
            aria-expanded={expand}
            aria-label="show more"
          >
            <ExpandMoreIcon className={classes.ExpandIcon} />
          </ExpandMore>

          <Grid
            width={stepPanelVisible ? (isDesktop ? "55%" : "100%") : "0"}
            padding={stepPanelVisible ? "0 2rem" : "0"}
            className={classes.widthTransition}
          >
            <Collapse
              data-testid="tutorial-steps-list"
              in={expand}
              timeout="auto"
              unmountOnExit
              orientation="horizontal"
              className={classes.collapseContainer}
            >
              <StepsPanel
                currentStep={currentStep}
                onChange={onChange}
                stepsData={stepsData}
                onClick={() => setStepPanelVisible(false)}
                hideButton={isDesktop}
                setCurrentStep={setCurrentStep}
                setStepData={setStepData}
              />
            </Collapse>
          </Grid>

          <Grid className={classes.editorContainer}>
            <Grid className="tutorial-content" justify="center" container>
              <Grid
                xs={24}
                sm={24}
                md={20}
                lg={18}
                className="col-pad-24-s mt-24-od tutorial-paper"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                {!isDesktop && stepPanelVisible ? null : (
                  <>
                    {mode === "view" && (
                      <div data-testId="tutorial-content">
                        <HtmlTextRenderer html={currentStepContent} />
                      </div>
                    )}
                    {mode === "edit" && (
                      <>
                        <StepsTitle
                          currentStepNo={currentStepNo}
                          owner={tutorialData.owner}
                          tutorial_id={tutorialData.tutorial_id}
                          step_id={stepsData[currentStep].id}
                          step_title={stepsData[currentStep].title}
                          step_time={stepsData[currentStep].time}
                        />

                        <QuillEditor
                          data={stepsData[currentStep].content}
                          tutorial_id={tutorialData.tutorial_id}
                          bgColor ={tutorialData.background_color || "#ffffff"}
                          textColor={tutorialData.text_color || "#000000"}
                          id={stepsData[currentStep].id}
                          key={
                            stepsData[currentStep].title +
                            stepsData[currentStep].id
                          }
                          mode={mode}
                        />
                      </>
                    )}
                  </>
                )}
              </Grid>
              {imageDrawerVisible && (
                <ImageDrawer
                  visible={imageDrawerVisible}
                  onClose={() => setImageDrawerVisible(false)}
                  owner={tutorialData.owner}
                  tutorial_id={tutorialData.tutorial_id}
                  imageURLs={tutorialData.imageURLs}
                />
              )}
              <AddNewStepModal
                viewModal={addNewStepModalVisible}
                viewCallback={() =>
                  setAddNewStepModalVisible(!addNewStepModalVisible)
                }
                tutorial_id={tutorialData.tutorial_id}
                steps_length={stepsData.length}
                owner={tutorialData.owner}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <Spinner half />;
  }
};

export default ViewTutorial;
