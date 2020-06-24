import * as actions from "../../actions/actionTypes";
import { modifyAuthErrorMsg } from "../../../helpers/errorMsgHandler";

const initialState = {
  loading: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_AUTH_PROFILE_STATE:
      return initialState;

    case actions.SIGN_UP_START:
    case actions.SIGN_IN_START:
    case actions.SEND_RESET_EMAIL_START:
    case actions.INITIAL_SETUP_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.SIGN_UP_SUCCESS:
    case actions.SIGN_IN_SUCCESS:
    case actions.SEND_RESET_EMAIL_SUCCESS:
    case actions.INITIAL_SETUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.SIGN_UP_FAIL:
    case actions.SIGN_IN_FAIL:
    case actions.SEND_RESET_EMAIL_FAIL:
    case actions.INITIAL_SETUP_FAIL:
      return {
        ...state,
        loading: false,
        error: modifyAuthErrorMsg(payload)
      };

    default:
      return state;
  }
};
