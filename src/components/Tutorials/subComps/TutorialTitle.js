import React from "react";
import { PageHeader, Button, Tooltip } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ClockCircleOutlined,
  FullscreenOutlined,
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

  let styleProps = {
    backgroundColor: tutorialData.background_color || "#ffffff",
    color: tutorialData.text_color || "#000000",
  };

  return (
    <PageHeader
      style={{ ...styleProps }}
      className={
        (!stepPanelVisible && !isDesktop
          ? "ant-page-header-fix "
          : "ant-page-header-unfix ") + "tutorial-title-header"
      }
      onBack={(e) => {
        setStepPanelVisible(!stepPanelVisible);
      }}
      title={<span style={{ ...styleProps }}>{tutorialData.title}</span>}
      backIcon={
        stepPanelVisible ? (
          <MenuFoldOutlined style={{ fontSize: "1.2rem", ...styleProps }} />
        ) : (
          <MenuUnfoldOutlined style={{ fontSize: "1.2rem", ...styleProps }} />
        )
      }
      extra={
        !isDesktop && stepPanelVisible ? null : (
          <>
            <Button type="text" className="p-0">
              <ClockCircleOutlined style={{ ...styleProps }} />{" "}
              <span style={{ ...styleProps }}>
                {timeRemaining} mins remaining
              </span>
            </Button>
            <Tooltip placement="left" title={"Go Fullscreen"}>
              <Button
                type="dashed"
                onClick={toggleFullscreen}
                className="bp-8"
                style={{ ...styleProps }}
              >
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
