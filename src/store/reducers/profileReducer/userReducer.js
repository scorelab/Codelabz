import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const ProfileUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_USER_PROFILE_DATA_STATE:
      return initialState;

    case actions.GET_USER_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };

    case actions.GET_USER_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default ProfileUserReducer;
