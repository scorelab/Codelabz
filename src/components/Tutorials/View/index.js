import React, { useState, useEffect } from "react";
import { Layout, Row, Col, PageHeader, Button } from "antd";
import { useMediaQuery } from "react-responsive";
import StepsPanel from "./StepsPanel";
import { stepsData, tutorialData } from "../../../helpers/dummyData";
import {
  MenuUnfoldOutlined,
  ClockCircleOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../../helpers/CodeBlock";
import { TutorialTimeRemaining } from "../../../helpers/tutorialTime";

const { Content, Sider } = Layout;

const ViewTutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPanelVisible, setStepPanelVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 767px)",
  });

  useEffect(() => {
    setStepPanelVisible(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    setTimeRemaining(TutorialTimeRemaining(stepsData, currentStep));
  }, [currentStep]);

  const onChange = (current) => {
    setCurrentStep(current);
    !isDesktop && setStepPanelVisible(false);
  };

  console.log(document.documentElement.getAttribute("data-theme"));
  return (
    <div className="row-footer-below">
      <Layout>
        <Sider
          width={stepPanelVisible ? (isDesktop ? "25%" : "83%") : "0"}
          className={
            (stepPanelVisible ? "col-pad-24-s scrollfix " : "") +
            "tutorial-steps-sider"
          }
          theme="light"
          style={{ backgroundColor: "white" }}
        >
          <StepsPanel
            currentStep={currentStep}
            onChange={onChange}
            stepsData={stepsData}
          />
        </Sider>

        <Content style={{ backgroundColor: "white" }}>
          <Row>
            <Col xs={24} sm={24} md={24}>
              <PageHeader
                className={
                  (!stepPanelVisible && !isDesktop
                    ? "ant-page-header-fix "
                    : "ant-page-header-unfix ") + "tutorial-title-header"
                }
                onBack={(e) => {
                  setStepPanelVisible(!stepPanelVisible);
                }}
                title={tutorialData.title}
                backIcon={
                  stepPanelVisible ? (
                    <MenuFoldOutlined style={{ fontSize: "1.2rem" }} />
                  ) : (
                    <MenuUnfoldOutlined style={{ fontSize: "1.2rem" }} />
                  )
                }
                extra={
                  !isDesktop && stepPanelVisible ? null : (
                    <Button type="text" className="p-0">
                      <ClockCircleOutlined /> {timeRemaining} mins remaining
                    </Button>
                  )
                }
              />
            </Col>
          </Row>
          <Row className="tutorial-content">
            <Col xs={24} sm={24} md={24} className="col-pad-24-s">
              {!isDesktop && stepPanelVisible ? null : (
                <ReactMarkdown
                  source={stepsData[currentStep].content}
                  renderers={{ code: CodeBlock }}
                />
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default ViewTutorial;
