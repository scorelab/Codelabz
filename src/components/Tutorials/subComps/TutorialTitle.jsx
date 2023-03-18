import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Typography } from "@mui/material";

const TutorialHeading = ({
  stepPanelVisible,
  isDesktop,
  setStepPanelVisible,
  tutorialData,
  timeRemaining
}) => {
  const toggleFullscreen = () => {
    document.documentElement.requestFullscreen();
  };

  let styleProps = {
    backgroundColor: tutorialData.background_color || "#ffffff",
    color: tutorialData.text_color || "#000000"
  };

  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <Typography
        data-testid="tutorialTitle"
        variant="h5"
        sx={{
          pt: 5
        }}
      >
        {tutorialData.title}
      </Typography>
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

export default TutorialHeading;
