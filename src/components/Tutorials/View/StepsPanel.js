import React from "react";
import { Steps, Button } from "antd";
const { Step } = Steps;

const StepsPanel = ({
  currentStep,
  onChange,
  stepsData,
  onClick,
  hideButton,
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

      <Steps
        current={currentStep}
        onChange={onChange}
        direction="vertical"
        style={{ backgroundColor: "white" }}
      >
        {stepsData &&
          stepsData.map((step) => {
            return (
              <Step
                title={step.title}
                className="pb-8"
                key={"step" + step.id}
              />
            );
          })}
      </Steps>
    </div>
  );
};

export default StepsPanel;
