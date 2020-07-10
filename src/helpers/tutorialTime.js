export const TutorialTimeRemaining = (steps, currentStep) => {
  console.log(currentStep);
  let remainingSteps = [...steps].splice(currentStep);
  let timeRemaining = 0;
  remainingSteps.forEach((step) => {
    timeRemaining += step.time;
  });
  return timeRemaining;
};
