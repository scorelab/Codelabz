import { combineReducers } from "redux";
import generalReducer from "./generalReducer";
import userReducer from "./userReducer";

export default combineReducers({
  general: generalReducer,
  user: userReducer
});
