import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_STATE:
      return initialState;

    case actions.SIGN_UP_START:
      return {
        ...state,
        loading: true
      };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case actions.RECOVERY_START:
      return {
        ...state,
        loading: true
      };

    case actions.RECOVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.RECOVERY_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
