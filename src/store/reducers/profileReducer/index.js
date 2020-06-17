import { combineReducers } from "redux";
import profileEditReducer from "./profileEditReducer";
import dataReducer from "./dataReducer";

export default combineReducers({
  edit: profileEditReducer,
  data: dataReducer
});
