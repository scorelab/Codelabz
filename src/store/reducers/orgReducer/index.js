import { combineReducers } from "redux";
import generalReducer from "./generalReducer";
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";

export default combineReducers({
  general: generalReducer,
  user: userReducer,
  data: dataReducer
});
