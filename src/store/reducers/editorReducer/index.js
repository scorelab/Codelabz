import { combineReducers } from "redux";
import editorReducer from "./editorReducer";

export default combineReducers({
  step: editorReducer
});
