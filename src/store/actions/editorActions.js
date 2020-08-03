import * as actions from "./actionTypes";

export const setCurrentStep = data => async dispatch =>
  dispatch({ type: actions.SET_EDITOR_DATA, payload: data });

export const setCurrentStepNo = data => async dispatch =>
  dispatch({ type: actions.SET_CURRENT_STEP_NO, payload: data });
