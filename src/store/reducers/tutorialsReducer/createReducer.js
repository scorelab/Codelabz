import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_CREATE_TUTORIALS_STATE:
      return initialState;

    case actions.CREATE_TUTORIAL_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.CREATE_TUTORIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.CREATE_TUTORIAL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
