import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERR,LOGIN_SUCCESS,LOGIN_FAILURE, LOGOUT_USER,RESET_SUCCESS} from './actionTypes';

import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { CLEAR_PROFILE } from '../profile/actionTypes';
import {setAlert} from '../alert/actions';

// load user
export const loadUser=()=>async dispatch=>{
    try {
        setAuthToken(localStorage.getItem('token'));
        const resp=await axios.get('/api/auth');
        console.log("Loading user......");
        console.log(resp.data);
        dispatch({
            type:USER_LOADED,
            payload:resp.data    
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type:AUTH_ERR
        })
    }
}
// register user
export const register=(userObj)=>async (dispatch)=>{
    try {
       const config={
           headers:{
               'content-type':'application/json'
           }
       }        
       const resp=await axios.post('/api/users',userObj,config);
       console.log(resp.data);
       dispatch({
           type:REGISTER_SUCCESS,
           payload:resp.data
       })
       setAuthToken(localStorage.getItem('token'));
       dispatch(setAlert('Account Successfully Created'))
       dispatch(loadUser());
    } catch (err) {
         dispatch({
             type:REGISTER_FAIL
         })
        dispatch(setAlert('User Already Registered'))
    }
}

// login user
export const login=(formData)=>async dispatch=>{
try {
  const config={
      headers:{
          'content-type':'application/json'
      }
  }   
 
  const userObj=JSON.stringify(formData);
  const resp=await axios.post('/api/auth',userObj,config);
  console.log(resp.data);
  dispatch({
      type:LOGIN_SUCCESS,
      payload:resp.data
  })
  dispatch(setAlert('Successfull Login'))
  dispatch(loadUser());
} catch (err) {
    dispatch({
        type:LOGIN_FAILURE
    })
    dispatch(setAlert('Invalid Credentials'))

}
}

//logout user
export const logout=()=>dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    dispatch({
        type:LOGOUT_USER
    })
}

// Forgot Password
export const forgot=(formData)=>async dispatch=>{
    try {
        const config={
            headers:{
                'content-type':'application/json'
            }
        }   
       
        const userObj=JSON.stringify(formData);
        const resp=await axios.post('/api/auth/password',userObj,config);
        console.log(resp.data);
        const msg=resp.data.msg || ' ';
        if(msg=='User Not Registered' || msg=='Internal server error'){
            dispatch(setAlert(msg));
        }
        else {
            dispatch(setAlert('Mail sent'))
        }
        
    } catch (err) {
        console.log(err)
    }
}

//reset Password
export const reset=(formData,id,history)=>async dispatch=>{
   try {
       const config={
           headers:{
               'content-type':'application/json'
           }
       }
       const resp=await axios.post(`/api/auth/reset/${id}`,formData,config)
       console.log(resp.data);
       dispatch({
           type:RESET_SUCCESS,
           payload:resp.data
       })
       console.log('Password updated ....');
       dispatch(setAlert('Password Updated SuccessFully'))
       history.push('/');
       dispatch(loadUser());
   } catch (err) {
       
   }
}