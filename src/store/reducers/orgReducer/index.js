import { combineReducers } from "redux";
import generalReducer from "./generalReducer";

export default combineReducers({
  general: generalReducer
});
