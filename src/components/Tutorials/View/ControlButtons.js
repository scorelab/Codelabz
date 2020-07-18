import React from "react";
import { Button, message, Affix } from "antd";

const ControlButtons = ({ currentStep, setCurrentStep, stepsData, hide }) => {
  const bottomMargin = 54;

  if (!hide && stepsData) {
    return (
      <Affix offsetBottom={bottomMargin} style={{ height: 0 }}>
        <div>
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
              onClick={() => {
                message.success("Tutorial complete!");
                window.scrollTo(0, 0);
              }}
              style={{ float: "right" }}
            >
              Finish
            </Button>
          )}
        </div>
      </Affix>
    );
  } else return null;
};

export default ControlButtons;
