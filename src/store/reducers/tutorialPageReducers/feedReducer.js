import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  homepageFeedArray: []
};

const FeedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_TUTORIAL_FEED_START:
      return {
        ...state,
        loading: true
      };

    case actions.GET_TUTORIAL_FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        homepageFeedArray: payload
      };

    case actions.GET_TUTORIAL_FEED_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default FeedReducer;
