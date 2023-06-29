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
  getCurrentStepContentFromRTDB,
  getCurrentTutorialData,
  setCurrentStepNo
} from "../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import Spinner from "../../helpers/spinner";
import AddNewStepModal from "./subComps/AddNewStep";
import QuillEditor from "../Editor/quillEditor";
import RichTextRenderer from "./subComps/RichTextRenderer";

const ViewTutorial = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPanelVisible, setStepPanelVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [mode, setMode] = useState("edit");
  const [allowEdit, setAllowEdit] = useState(true);
  const [imageDrawerVisible, setImageDrawerVisible] = useState(false);
  const [addNewStepModalVisible, setAddNewStepModalVisible] = useState(false);
  const [currentStepContent, setCurrentStepContent] = useState(null);
  const [stepsData, setStepData] = useState(null);
  const [tutorialData, setTutorialData] = useState(null);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)"
  });
  const { owner, tutorial_id } = useParams();

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
      getCurrentStepContentFromRTDB(tutorial_id, stepsData[currentStep].id)(
        firebase,
        dispatch
      );
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
        <Grid style={{ display: "flex", flexDirection: "row" }}>
          <Grid
            width={stepPanelVisible ? (isDesktop ? "55%" : "100%") : "0"}
            style={{ backgroundColor: "white", padding: "2rem" }}
          >
            <StepsPanel
              currentStep={currentStep}
              onChange={onChange}
              stepsData={stepsData}
              onClick={() => setStepPanelVisible(false)}
              hideButton={isDesktop}
              setCurrentStep={setCurrentStep}
            />
          </Grid>

          <Grid style={{ width: "90%", background: "#f0f0f0" }}>
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
                        {/* <ReactMarkdown children={currentStepContent} /> */}
                        <RichTextRenderer delta={currentStepContent} />
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
                        {/* <Editor
                            data={stepsData[currentStep].content}
                            tutorial_id={tutorialData.tutorial_id}
                            id={stepsData[currentStep].id}
                            key={
                              stepsData[currentStep].title +
                              stepsData[currentStep].id
                            }
                            mode={mode}
                          /> */}

                        
                        <QuillEditor
                          data={stepsData[currentStep].content}
                          tutorial_id={tutorialData.tutorial_id}
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
            <Grid>
              <Grid xs={24} sm={24} md={24} className="col-pad-24-s">
                <ControlButtons
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  stepsData={stepsData}
                  hide={!isDesktop && stepPanelVisible}
                />
              </Grid>
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
