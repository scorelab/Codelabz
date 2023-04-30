export const TutorialTimeRemaining = (steps, currentStep) => {
  let remainingSteps = [...steps].splice(currentStep);
  let timeRemaining = 0;
  remainingSteps.forEach((step) => {
    timeRemaining += parseInt(step.time);
  });
  return timeRemaining;
};
