import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null
};

const launchedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_ORG_DATA_STATE:
      return initialState;

    case actions.GET_LAUNCHED_ORGS_START:
      return {
        ...state,
        loading: true
      };

    case actions.GET_LAUNCHED_ORGS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload
      };

    case actions.GET_LAUNCHED_ORGS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
export default launchedReducer;
