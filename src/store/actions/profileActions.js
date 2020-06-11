import * as actions from "./actionTypes";

export const clearProfileEditError = () => async dispatch => {
  dispatch({ type: actions.CLEAR_PROFILE_EDIT_STATE });
};
