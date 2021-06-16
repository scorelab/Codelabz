import * as actions from "../../actions/actionTypes";

const initialState = {
  current_step: "",
  current_step_no: 0,
};

const TutorialsEditorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_EDITOR_STATE:
      return initialState;

    case actions.SET_EDITOR_DATA:
      return {
        ...state,
        current_step: payload,
      };

    case actions.SET_CURRENT_STEP_NO:
      return {
        ...state,
        current_step_no: payload,
      };

    default:
      return state;
  }
};

export default TutorialsEditorReducer;
