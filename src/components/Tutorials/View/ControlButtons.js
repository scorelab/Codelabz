import React from "react";
import { Button, message } from "antd";

const ControlButtons = ({ currentStep, setCurrentStep, stepsData, hide }) => {
  if (!hide && stepsData) {
    return (
      <>
        {currentStep > 0 && (
          <Button
            onClick={() => {
              setCurrentStep(currentStep - 1);
              window.scrollTo(0, 0);
            }}
          >
            Previous
          </Button>
        )}
        {currentStep < stepsData.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              setCurrentStep(currentStep + 1);
              window.scrollTo(0, 0);
            }}
            style={{ float: "right" }}
          >
            Next
          </Button>
        )}
        {currentStep === stepsData.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Tutorial complete!")}
            style={{ float: "right" }}
          >
            Finish
          </Button>
        )}
      </>
    );
  } else return null;
};

export default ControlButtons;
