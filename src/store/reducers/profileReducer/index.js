import { combineReducers } from "redux";
import profileEditReducer from "./profileEditReducer";

export default combineReducers({
  edit: profileEditReducer
});
