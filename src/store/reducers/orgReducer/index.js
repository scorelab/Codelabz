import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import generalReducer from './generalReducer';
import launchedOrgsReducer from './launchedOrgsReducer';
import userReducer from './userReducer';

export default combineReducers({
  general: generalReducer,
  user: userReducer,
  data: dataReducer,
  launched: launchedOrgsReducer,
});
