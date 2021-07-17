import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const StepsPanel = ({
  currentStep,
  onChange,
  stepsData,
  onClick,
  hideButton,
}) => {
  const stepView = (title, visibility) => (
    <div style={{ width: "100%" }}>
      <span>{title} </span>
      <span
        style={{
          float: "right",
          verticalAlign: "middle",
        }}
      >
        {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </span>
    </div>
  );

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
        style={{ backgroundColor: "white" }}
      >
        {stepsData &&
          stepsData.map((step) => {
            return (
              <Step className="pb-8 custom-step" key={"step" + step.id}>
                <StepLabel
                  style={{
                    border: "2px solid gray",
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
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
