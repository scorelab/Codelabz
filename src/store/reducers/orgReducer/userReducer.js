import * as actions from "../../actions/actionTypes";

const initialState = {
  isLoaded: true,
  isEmpty: true,
  error: null,
  data: []
};

//notes on reducer
//initial state isLoaded: true isEmpty: true
//start state isLoaded: false isEmpty:true
//success state isLoaded: true isEmpty:false
//fail state isLoaded: true isEmpty:true
const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_ORG_USER_STATE:
      return initialState;

    case actions.GET_ORG_USER_DATA_START:
    case actions.ADD_ORG_USER_START:
      return {
        ...state,
        isLoaded: false,
        isEmpty: true,
        error: null
      };

    case actions.GET_ORG_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isEmpty: false,
        data: payload
      };

    case actions.ADD_ORG_USER_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isEmpty: false,
        error: false
      };

    case actions.GET_ORG_USER_DATA_FAIL:
    case actions.ADD_ORG_USER_FAIL:
      return {
        ...state,
        isLoaded: true,
        isEmpty: true,
        error: payload
      };

    default:
      return state;
  }
};

export default UserReducer;
