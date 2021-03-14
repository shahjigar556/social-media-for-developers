import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERR,LOGIN_SUCCESS,LOGIN_FAILURE, LOGOUT_USER} from './actionTypes';

import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

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
       alert('Account Successfully Created')
       dispatch(loadUser());
    } catch (err) {
        alert('User Already Registered')
         dispatch({
             type:REGISTER_FAIL
         })
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

  dispatch(loadUser());
} catch (err) {
    console.error(err.message);
    dispatch({
        type:LOGIN_FAILURE
    })
}
}

//logout user
export const logout=()=>dispatch=>{
    dispatch({
        type:LOGOUT_USER
    })
}