import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
import dataReducer from "./dataReducer";
import createReducer from "./createReducer";

export default combineReducers({
  editor: editorReducer,
  data: dataReducer,
  create: createReducer
});
