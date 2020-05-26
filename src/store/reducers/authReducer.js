import * as actions from "../actions/actionTypes";

const initialState = {
  profile: {
    loading: false,
    error: null
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SIGN_IN_START:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true
        }
      };

    case actions.SIGN_IN_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: false
        }
      };

    case actions.SIGN_IN_FAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: payload
        }
      };

    default:
      return state;
  }
};
