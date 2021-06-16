import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const DataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAR_ORG_DATA_STATE:
      return initialState;

    case actions.GET_ORG_DATA_START:
      return {
        ...state,
        loading: true,
      };

    case actions.GET_ORG_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };

    case actions.GET_ORG_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default DataReducer;
