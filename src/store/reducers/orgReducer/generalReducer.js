import * as actions from "../../actions/actionTypes";

const initialState = {
  current: null,
  permissions: [],
  isLoaded: true,
  isEmpty: true,
  error: null,
  data: null
};

//notes on reducer
//initial state isLoaded: true isEmpty: true
//start state isLoaded: false isEmpty:true
//success state isLoaded: true isEmpty:false
//fail state isLoaded: true isEmpty:true
export default (state = initialState, { type, payload }) => {
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

    default:
      return state;
  }
};
