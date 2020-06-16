import * as actions from "../../actions/actionTypes";

const initialState = {
  data: null,
  loading: false,
  error: null,
  isLoading: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_PROFILE_DATA_STATE:
      return initialState;

    case actions.GET_PROFILE_DATA_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.GET_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
        isLoading: false
      };

    case actions.GET_PROFILE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
