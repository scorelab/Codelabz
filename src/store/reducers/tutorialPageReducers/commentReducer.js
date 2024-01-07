import * as actions from "../../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  data: [],
  replies: []
};

const CommentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_COMMENT_DATA_START:
      return {
        ...state,
        loading: true
      };

    case actions.GET_COMMENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [...payload]
      };

    case actions.GET_COMMENT_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case actions.GET_REPLIES_START:
      return {
        ...state,
        loading: true
      };

    case actions.GET_REPLIES_SUCCESS:
      return {
        ...state,
        loading: false,
        replies: [...state.replies, payload]
      };

    case actions.ADD_COMMENT_START:
      return {
        ...state,
        loading: true
      };

    case actions.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        data: [payload, ...state.data],
        loading: false
      };

    case actions.ADD_COMMENT_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case actions.ADD_REPLY_START:
      return {
        ...state,
        loading: true
      };

    case actions.ADD_REPLY_SUCCESS:
      state.replies = state.replies.map(reply => {
        if (payload && reply && reply.comment_id === payload.replyTo) {
          reply.replies = [payload, ...reply.replies];
        }
        return reply;
      });

      return {
        ...state,
        loading: false
      };

    case actions.ADD_REPLY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };

    default:
      return state;
  }
};

export default CommentReducer;
