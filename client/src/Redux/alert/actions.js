import {REMOVE_ALERT, SET_ALERT} from './actionTypes';
import { v4 as uuidv4 } from 'uuid';
export const setAlert=(msg,alertType)=>({
    type:SET_ALERT,
    payload:{
        id:uuidv4(),
        msg,
        alertType
    }
})

export const removeAlert=(id)=>({
    type:REMOVE_ALERT,
    payload:{
        id
    }
})