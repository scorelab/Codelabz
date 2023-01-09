import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import verifyEmailReducer from "./verifyEmailReducer";
import recoverPasswordReducer from "./recoverPasswordReducer";

export default combineReducers({
  profile: profileReducer,
  verifyEmail: verifyEmailReducer,
  recoverPassword: recoverPasswordReducer
});
