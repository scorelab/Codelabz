import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import verifyEmailReducer from "./verifyEmailReducer";

export default combineReducers({
  profile: profileReducer,
  verifyEmail: verifyEmailReducer
});
