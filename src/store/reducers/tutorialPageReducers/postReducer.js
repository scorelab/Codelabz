import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: true,
  error: null,
  data: null,
  steps: []
};

const PostReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_POST_DATA_STATE:
      return initialState;

    case actions.GET_POST_DATA_START:
      return {
        ...state,
        loading: true
      };

    case actions.GET_POST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload
      };

    case actions.GET_POST_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case actions.GET_STEPS_DATA_START:
      return {
        ...state,
        loading: true
      };

    case actions.GET_STEPS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        steps: payload
      };

    case actions.GET_STEPS_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default PostReducer;
