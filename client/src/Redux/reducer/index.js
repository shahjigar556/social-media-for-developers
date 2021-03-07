import {combineReducers} from 'redux';
import alertReducer from '../alert/reducer';

const rootReducer=combineReducers({
  alert:alertReducer,
});

export default rootReducer;