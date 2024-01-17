import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null
};

const ProfileEditReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_PROFILE_EDIT_STATE:
      return initialState;

    case actions.PROFILE_EDIT_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.PROFILE_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.PROFILE_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case actions.ADD_EMAIL_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actions.ADD_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case actions.ADD_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default ProfileEditReducer;
