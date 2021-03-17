import {REMOVE_ALERT, SET_ALERT} from './actionTypes';
import { v4 as uuidv4 } from 'uuid';
export const setAlert = (msg, alertType='danger', timeout = 3000) => dispatch => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { id,msg,alertType}
    });
  
    setTimeout(() => dispatch({ type:REMOVE_ALERT, payload: id }), timeout);
  };