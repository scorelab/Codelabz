import * as actions from "../../actions/actionTypes";

const initialState = {
  user: null,
  org: [],
  loading: false,
  error: null
};

const TutorialsDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_TUTORIALS_BASIC_STATE:
      return initialState;

    case actions.GET_USER_TUTORIALS_BASIC_START:
    case actions.GET_ORG_TUTORIALS_BASIC_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.GET_USER_TUTORIALS_BASIC_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: false
      };

    case actions.GET_ORG_TUTORIALS_BASIC_SUCCESS:
      return {
        ...state,
        org: payload,
        loading: false,
        error: false
      };

    case actions.GET_USER_TUTORIALS_BASIC_FAIL:
    case actions.GET_ORG_TUTORIALS_BASIC_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default TutorialsDataReducer;
