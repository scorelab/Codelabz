import * as actions from "../../actions/actionTypes";
import DataReducer from "../orgReducer/dataReducer";

const initialState = {
  isLoaded: true,
  isEmpty: true,
  error: null,
};

const ProfileDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_PROFILE_DATA_STATE:
      return initialState;

    case actions.GET_PROFILE_DATA_START:
      return {
        ...state,
        isLoaded: false,
        isEmpty: true,
        error: null,
      };

    case actions.GET_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoaded: true,
        isEmpty: false,
        error: false,
      };

    case actions.GET_PROFILE_DATA_FAIL:
      return {
        ...state,
        isLoaded: true,
        isEmpty: true,
        error: payload,
      };

    case actions.GET_PROFILE_DATA_END:
      return {
        ...state,
        isLoaded: true,
        isEmpty: true,
      };

    default:
      return state;
  }
};

export default ProfileDataReducer;
