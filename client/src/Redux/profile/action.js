import {GET_PROFILE,PROFILE_ERR,CREATE_PROFILE,UPDATE_PROFILE,UPDATE_EDUCATION, DELETE_ACCOUNT} from './actionTypes';
import {setAlert} from '../alert/actions';
import {logout} from '../auth/actions';
import axios from 'axios';


//get Profile
export const getProfile=()=>async (dispatch)=>{
    try {
        const resp=await axios.get('/api/profile/me');
        console.log(resp);
        dispatch({
            type:GET_PROFILE,
            payload:resp.data
        })
    } catch (err) {
        dispatch({
            type:PROFILE_ERR
        })
    }
}

// create Profile
export const createProfile=(formData,history,edit=false)=> async (dispatch)=>{
    try {
        const config={
            headers:{
                "content-type":'application/json'
            }
        }
        const resp=await axios.post('/api/profile',formData,config);
        dispatch({
            type:CREATE_PROFILE,
            payload:resp.data
        })
        if(!edit){
            history.push('/dashboard');
            dispatch(setAlert("Profile Created Sucessfully"));
        }
        dispatch(setAlert("Profile Updated Successfully"))
        

    } catch (err) {
        dispatch({
            type:PROFILE_ERR
        })
    }

}

// update Profile

export const updateProfile=(formData,history)=>async (dispatch)=>{
    try {
      const config={
          headers:{
              'content-type':'application/json'
          }
      }
      const resp=await axios.put('/api/profile/experience',formData,config);
      dispatch({
          type:UPDATE_PROFILE,
          payload:resp.data
      })
     history.push('/dashboard')
     dispatch(setAlert('Profile Updated Succesfully'));
    } catch (err) {
        dispatch({
            type:PROFILE_ERR
        })
        history.push('/dashboard');
    }
}

// update Education
 export const updateEducation=(formData,history)=>async (dispatch)=>{
     try {
         const config={
             headers:{
                 'content-type':'application/json'
             }
         }

         const resp=await axios.put('/api/profile/education',formData,config)
         dispatch({
             type:UPDATE_EDUCATION,
             payload:resp.data
         })
         history.push('/')
         dispatch(setAlert("Education details added"));

     } catch (err) {
         dispatch({
             type:PROFILE_ERR
         })
     }
 }

 // deteteExperience
 export const deleteExp=(id)=>async dispatch=>{
     try {
        const resp=await axios.delete(`/api/profile/experience/${id}`) 
        console.log(resp.data)
         dispatch({
             type:UPDATE_PROFILE,
             payload:resp.data
         })
         dispatch(setAlert('Experience Updated Successfully'));
     } catch (err) {
         dispatch({
             type:PROFILE_ERR
         })
     }
 }

 // delete education

 export const deleteEdu=(id)=>async dispatch=>{
     try{
        const resp=await axios.delete(`/api/profile/education/${id}`) 
        dispatch({
            type:UPDATE_PROFILE,
            payload:resp.data
        })
        dispatch(setAlert('Education Updated Successfully'));
      
     }catch(err){
       dispatch({
           type:PROFILE_ERR
       })
     }
 }


 // delete User
 export const deleteUser=()=>async dispatch=>{
     try {
         const resp=await axios.delete('/api/profile');
         dispatch(logout())
         dispatch({
             type:DELETE_ACCOUNT,
         })
         dispatch(setAlert("Account deleted Successfully"))
     } catch (err) {
         dispatch({
             type:PROFILE_ERR
         })
     }
 }