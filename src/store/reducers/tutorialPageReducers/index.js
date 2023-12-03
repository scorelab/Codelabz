import { combineReducers } from "redux";
import PostReducer from "./postReducer";
import CommentReducer from "./commentReducer";
import FeedReducer from "./feedReducer";

export default combineReducers({
  post: PostReducer,
  comment: CommentReducer,
  feed: FeedReducer
});
