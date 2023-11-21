import * as actions from "../../actions/actionTypes";

const initialState = {
  current: null,
  permissions: [],
  isLoaded: true,
  isEmpty: true,
  loading: false,
  error: null
};

//notes on reducer
//initial state isLoaded: true isEmpty: true
//start state isLoaded: false isEmpty:true
//success state isLoaded: true isEmpty:false
//fail state isLoaded: true isEmpty:true
const GeneralReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_ORG_GENERAL_STATE:
      return initialState;

    case actions.SET_CURRENT_ORG_PERMISSIONS_START:
      return {
        ...state,
        isLoaded: false,
        isEmpty: true
      };

    case actions.SET_CURRENT_ORG_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: payload.permissions,
        current: payload.org_handle,
        isLoaded: true,
        isEmpty: false
      };

    case actions.SET_CURRENT_ORG_PERMISSIONS_FAIL:
      return {
        ...state,
        isLoaded: true,
        isEmpty: true
      };

    case actions.GET_ORG_GENERAL_START:
    case actions.EDIT_ORG_GENERAL_START:
      return {
        ...state,
        loading: true
      };

    case actions.CLEAR_EDIT_ORG_GENERAL:
      return {
        ...state,
        loading: false,
        error: null
      };

    case actions.GET_ORG_GENERAL_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case actions.EDIT_ORG_GENERAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };

    case actions.GET_ORG_GENERAL_FAIL:
    case actions.EDIT_ORG_GENERAL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default GeneralReducer;
