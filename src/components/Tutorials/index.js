import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import StepsPanel from "./subComps/StepsPanel";
import ReactMarkdown from "react-markdown";
import { CodeBlock, ImageRenderer } from "../../helpers/CustomRenderers";
import { TutorialTimeRemaining } from "../../helpers/tutorialTime";
import ControlButtons from "./subComps/ControlButtons";
import TutorialTitle from "./subComps/TutorialTitle";
import EditControls from "./subComps/EditControls";
import Editor from "../Editor";
import ImageDrawer from "./subComps/ImageDrawer";
import StepsTitle from "./subComps/StepsTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentStepContentFromRTDB,
  getCurrentTutorialData,
  setCurrentStepNo,
} from "../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import Spinner from "../../helpers/spinner";
import AddNewStepModal from "./subComps/AddNewStep";

const { Content, Sider } = Layout;

const ViewTutorial = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPanelVisible, setStepPanelVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [mode, setMode] = useState("view"); // modes = edit, view
  const [allowEdit, setAllowEdit] = useState(true);
  const [imageDrawerVisible, setImageDrawerVisible] = useState(false);
  const [addNewStepModalVisible, setAddNewStepModalVisible] = useState(false);
  const [currentStepContent, setCurrentStepContent] = useState(null);
  const [stepsData, setStepData] = useState(null);
  const [tutorialData, setTutorialData] = useState(null);
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });
  const { owner, tutorial_id } = useParams();

  useEffect(() => {
    getCurrentTutorialData(owner, tutorial_id)(firebase, firestore, dispatch);
  }, [owner, tutorial_id, firebase, firestore, dispatch]);

  const currentStepNo = useSelector(
    ({
      tutorials: {
        editor: { current_step_no },
      },
    }) => current_step_no
  );

  const currentTutorialData = useSelector(
    ({
      tutorials: {
        current: { data },
      },
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
        editor: { current_step },
      },
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

  const onChange = (current) => {
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
      <Layout className="row-footer-below">
        {allowEdit && (
          <Row>
            <Col xs={24} sm={24} md={24}>
              <EditControls
                stepPanelVisible={stepPanelVisible}
                isDesktop={isDesktop}
                noteID={stepsData[currentStep].id}
                setMode={(mode) => setMode(mode)}
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
            </Col>
          </Row>
        )}

        <Row>
          <Col xs={24} sm={24} md={24}>
            <TutorialTitle
              stepPanelVisible={stepPanelVisible}
              isDesktop={isDesktop}
              setStepPanelVisible={setStepPanelVisible}
              tutorialData={tutorialData}
              timeRemaining={timeRemaining}
            />
          </Col>
        </Row>
        <Layout>
          <Sider
            width={stepPanelVisible ? (isDesktop ? "25%" : "100%") : "0"}
            className={stepPanelVisible ? "col-pad-24-s scrollfix " : ""}
            theme="light"
            style={{ backgroundColor: "white" }}
          >
            <StepsPanel
              currentStep={currentStep}
              onChange={onChange}
              stepsData={stepsData}
              onClick={() => setStepPanelVisible(false)}
              hideButton={isDesktop}
            />
          </Sider>

          <Content style={{ backgroundColor: "#f0f0f0" }}>
            <Row className="tutorial-content" justify="center">
              <Col
                xs={24}
                sm={24}
                md={20}
                lg={18}
                className="col-pad-24-s mt-24-od tutorial-paper"
              >
                {!isDesktop && stepPanelVisible ? null : (
                  <>
                    {mode === "view" && (
                      <ReactMarkdown
                        source={currentStepContent}
                        renderers={{ code: CodeBlock, image: ImageRenderer }}
                      />
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
                        <Editor
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
              </Col>
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
            </Row>
            <Row>
              <Col xs={24} sm={24} md={24} className="col-pad-24-s">
                <ControlButtons
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  stepsData={stepsData}
                  hide={!isDesktop && stepPanelVisible}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  } else {
    return <Spinner half />;
  }
};

export default ViewTutorial;
