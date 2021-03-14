import {combineReducers} from 'redux';
import alertReducer from '../alert/reducer';
import authReducer from '../auth/reducer'; 
const rootReducer=combineReducers({
  alert:alertReducer,
  auth:authReducer,
});

export default rootReducer;