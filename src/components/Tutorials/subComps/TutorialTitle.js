import React, { useEffect, useState } from "react";
import { PageHeader, Button, Tooltip } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ClockCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";

const TutorialTitle = ({
  stepPanelVisible,
  isDesktop,
  setStepPanelVisible,
  tutorialData,
  timeRemaining,
}) => {
  const toggleFullscreen = () => {
    document.documentElement.requestFullscreen();
  };
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
          <>
            <Button type="text" className="p-0">
              <ClockCircleOutlined /> {timeRemaining} mins remaining
            </Button>
            <Tooltip placement="left" title={"Go Fullscreen"}>
              <Button type="dashed" onClick={toggleFullscreen} className="bp-8">
                <FullscreenOutlined />
              </Button>
            </Tooltip>
          </>
        )
      }
    />
  );
};

export default TutorialTitle;
