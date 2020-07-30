import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
import dataReducer from "./dataReducer";

export default combineReducers({
  editor: editorReducer,
  data: dataReducer
});
