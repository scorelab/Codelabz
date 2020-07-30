import React, { useState, useEffect } from "react";
import { Layout, Row, Col } from "antd";
import { useMediaQuery } from "react-responsive";
import StepsPanel from "./subComps/StepsPanel";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../helpers/CodeBlock";
import { TutorialTimeRemaining } from "../../helpers/tutorialTime";
import ControlButtons from "./subComps/ControlButtons";
import TutorialTitle from "./subComps/TutorialTitle";
import EditControls from "./subComps/EditControls";
import Editor from "../Editor";
import ImageDrawer from "./subComps/ImageDrawer";
import StepsTitle from "./subComps/StepsTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentTutorialData } from "../../store/actions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import Spinner from "../../helpers/spinner";

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
    setAllowEdit(true); // remove this laterrrr
    setStepPanelVisible(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    if (stepsData) {
      setTimeRemaining(TutorialTimeRemaining(stepsData, currentStep));
      setCurrentStepContent(stepsData[currentStep].content);
    }
  }, [stepsData, currentStep]);

  const onChange = current => {
    setCurrentStep(current);
    !isDesktop &&
      setTimeout(() => {
        setStepPanelVisible(false);
      }, 300);
  };

  if (tutorialData) {
    return (
      <Layout className="row-footer-below">
        {allowEdit && (
          <Row>
            <Col xs={24} sm={24} md={24}>
              <EditControls
                stepPanelVisible={stepPanelVisible}
                isDesktop={isDesktop}
                noteID={stepsData[currentStep].id}
                setMode={mode => setMode(mode)}
                mode={mode}
                toggleImageDrawer={() =>
                  setImageDrawerVisible(!imageDrawerVisible)
                }
                tutorial_id={tutorialData.tutorial_id}
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
                        renderers={{ code: CodeBlock }}
                      />
                    )}
                    {mode === "edit" && (
                      <>
                        <StepsTitle />
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
                />
              )}
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
    return <Spinner />;
  }
};

export default ViewTutorial;
