import React from "react";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

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
						onClick={onClick}>
						Close
					</Button>
				)}

			<Stepper
				activeStep={currentStep}
				orientation="vertical"
				onChange={onChange}
				style={{ backgroundColor: "white" }}>
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
									}}>
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
