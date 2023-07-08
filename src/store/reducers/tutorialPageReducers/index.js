import { combineReducers } from "redux";
import PostReducer from "./postReducer";

export default combineReducers({
  post: PostReducer
});
