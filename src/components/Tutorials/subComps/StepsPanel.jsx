import React from "react";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import { borderRadius } from "@mui/system";
import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";
import ControlButtons from "./ControlButtons";

const useStyles = makeStyles({
  stepperContainer: {
    width: "90%"
  },
  stepButtonStyle: {
    padding: "8px 16px",
    borderRadius: 20,
    backgroundColor: grey[100]
  }
});

const StepsPanel = ({
  currentStep,
  onChange,
  stepsData,
  onClick,
  hideButton,
  setCurrentStep,
  setStepData,
}) => {
  const classes = useStyles();
  return (
    <Box className="tutorial-steps-sider" sx={theme => ({ p: 1 })}>
      <Grid>
        <Grid xs={24} sm={24} md={24} className="col-pad-24-s">
          <ControlButtons
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            stepsData={stepsData}
            setStepData={setStepData}
            hide={!hideButton}
          />
        </Grid>
      </Grid>
      {!hideButton &&
        false && ( //remove false to show
          <Button
            type="link"
            size="large"
            style={{ float: "right", padding: 0, marginRight: "4px" }}
            onClick={onClick}
          >
            Close
          </Button>
        )}

      <Stepper
        activeStep={currentStep}
        orientation="vertical"
        onChange={onChange}
        data-testid={"stepsPanel"}
        nonLinear
        className={classes.stepperContainer}
      >
        {stepsData &&
          stepsData.map((step, index) => {
            return (
              <Step key={"step" + step.id} completed={step.completed}>
                <StepButton
                  className={classes.stepButtonStyle}
                  onClick={() => {
                    setCurrentStep(index);
                  }}
                >
                  {step.title}
                  {step.visibility}
                </StepButton>
              </Step>
            );
          })}
      </Stepper>
    </Box>
  );
};

export default StepsPanel;
