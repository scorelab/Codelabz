import * as actions from "./actionTypes";

export const setCurrentStep = data => async dispatch => {
  dispatch({ type: actions.SET_EDITOR_DATA, payload: data });
};
