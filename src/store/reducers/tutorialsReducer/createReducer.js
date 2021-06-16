import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
};

const TutorialsCreateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_CREATE_TUTORIALS_STATE:
      return initialState;

    case actions.CREATE_TUTORIAL_START:
    case actions.CREATE_TUTORIAL_STEP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.CREATE_TUTORIAL_SUCCESS:
    case actions.CREATE_TUTORIAL_STEP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case actions.CREATE_TUTORIAL_FAIL:
    case actions.CREATE_TUTORIAL_STEP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default TutorialsCreateReducer;
