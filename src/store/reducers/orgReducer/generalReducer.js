import * as actions from "../../actions/actionTypes";

const initialState = {
  current: null,
  permissions: [],
  loading: false,
  error: null,
  data: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_ORG_GENERAL_STATE:
      return initialState;

    case actions.SET_CURRENT_ORG:
      return {
        ...state,
        current: payload
      };

    case actions.SET_CURRENT_ORG_PERMISSIONS:
      return {
        ...state,
        permissions: payload
      };

    case actions.GET_ORG_GENERAL_DATA_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case actions.GET_ORG_GENERAL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        current: payload.org_handle,
        data: payload
      };

    case actions.GET_ORG_GENERAL_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};
