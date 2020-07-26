import * as actions from "../../actions/actionTypes";

const initialState = {
  current: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_EDITOR_STATE:
      return initialState;

    case actions.SET_EDITOR_DATA:
      return {
        ...state,
        current: payload
      };

    default:
      return state;
  }
};
