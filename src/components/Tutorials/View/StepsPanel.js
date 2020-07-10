import React from "react";
import { Steps } from "antd";
const { Step } = Steps;

const StepsPanel = ({ currentStep, onChange, stepsData }) => {
  return (
    <Steps
      current={currentStep}
      onChange={onChange}
      direction="vertical"
      style={{ backgroundColor: "white" }}
    >
      {stepsData &&
        stepsData.map((step) => {
          return (
            <Step title={step.title} className="pb-8" key={"step" + step.id} />
          );
        })}
    </Steps>
  );
};

export default StepsPanel;
