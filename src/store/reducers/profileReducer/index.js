import { combineReducers } from "redux";
import profileEditReducer from "./profileEditReducer";
import dataReducer from "./dataReducer";
import userReducer from "./userReducer";

export default combineReducers({
  edit: profileEditReducer,
  data: dataReducer,
  user: userReducer
});
