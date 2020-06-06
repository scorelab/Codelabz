import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_AUTH_VERIFY_EMAIL_STATE:
      return initialState;

    case actions.RESEND_VERIFY_EMAIL_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.RESEND_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.RESEND_VERIFY_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
