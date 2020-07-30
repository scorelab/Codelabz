import * as actions from "../../actions/actionTypes";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_CURRENT_TUTORIAL_STATE:
      return initialState;

    case actions.GET_CURRENT_TUTORIAL_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.GET_CURRENT_TUTORIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload
      };

    case actions.GET_CURRENT_TUTORIAL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
