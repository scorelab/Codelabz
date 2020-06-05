import * as actions from "../actions/actionTypes";

const initialState = {
  profile: {
    loading: false,
    error: null
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SIGN_UP_START:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true
        }
      };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          error: false
        }
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false
        }
      };

    default:
      return state;
  }
};
