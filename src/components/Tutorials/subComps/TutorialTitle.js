import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import FullscreenIcon from "@material-ui/icons/Fullscreen";

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
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <h2>{tutorialData.title}</h2>
      {!isDesktop && stepPanelVisible ? null : (
        <>
          <Grid>
            <Button type="text" className="p-0">
              <QueryBuilderIcon style={{ ...styleProps }} />{" "}
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
                <FullscreenIcon />
              </Button>
            </Tooltip>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default TutorialTitle;
