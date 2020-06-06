import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  user: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_AUTH_PROFILE_STATE:
      return initialState;

    case actions.SIGN_UP_START:
    case actions.SIGN_IN_START:
    case actions.VERIFY_RESET_CODE_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.SIGN_UP_SUCCESS:
    case actions.SIGN_IN_SUCCESS:
    case actions.VERIFY_RESET_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: payload
      };

    case actions.SIGN_UP_FAIL:
    case actions.SIGN_IN_FAIL:
    case actions.VERIFY_RESET_CODE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
