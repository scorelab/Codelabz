import React from "react";
import { Steps } from "antd";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
const { Step } = Steps;

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
      <span style={{ float: "right", verticalAlign: "middle" }}>
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
                title={stepView(step.title, step.visibility)}
                className="pb-8 custom-step"
                key={"step" + step.id}
              />
            );
          })}
      </Steps>
    </div>
  );
};

export default StepsPanel;
