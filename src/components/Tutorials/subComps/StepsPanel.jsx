import React from "react";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { borderRadius } from "@mui/system";

const StepsPanel = ({
  currentStep,
  onChange,
  stepsData,
  onClick,
  hideButton,
  setCurrentStep
}) => {
  return (
    <div className="tutorial-steps-sider">
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
      >
        {stepsData &&
          stepsData.map((step, index) => {
            return (
              <Step key={"step" + step.id}>
                <StepLabel
                  sx={theme => ({
                    p: 2,
                    borderRadius: 5,
                    backgroundColor: theme.palette.grey[100]
                  })}
                >
                  {step.title}
                  {step.visibility}
                </StepLabel>
              </Step>
            );
          })}
      </Stepper>
    </div>
  );
};

export default StepsPanel;
