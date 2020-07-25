import React from "react";
import { PageHeader, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const TutorialTitle = ({
  stepPanelVisible,
  isDesktop,
  setStepPanelVisible,
  tutorialData,
  timeRemaining,
}) => {
  return (
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
  );
};

export default TutorialTitle;
