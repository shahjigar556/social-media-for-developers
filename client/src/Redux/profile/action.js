import {GET_PROFILE,PROFILE_ERR,CREATE_PROFILE,UPDATE_PROFILE,UPDATE_EDUCATION, DELETE_ACCOUNT,GET_PROFILES,GET_VISITING_PROFILE, GET_VISITING_USER, CLEAR_VISITING_USER, CLEAR_VISITING_PROFILE} from './actionTypes';
import {setAlert} from '../alert/actions';
import {logout} from '../auth/actions';
import axios from 'axios';


//get Profile
export const getProfile=()=>async (dispatch)=>{
    try {
        const resp=await axios.get('/api/profile/me');
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


//get Profiles

export const getProfiles=()=>async dispatch=>{
    try {
        const resp=await axios.get('/api/profile');
        let profiles=[...resp.data];
        
        profiles=await Promise.all(profiles.map(async (profile)=>{
            let user=await axios.get(`/api/users/${profile.user}`)
            const {name,email,avatar}=user.data;
            console.log(`name:${name}`);
            profile.name=name;
            profile.email=email;
            profile.avatar=avatar;
            return profile;
        }))
        
        dispatch({
            type:GET_PROFILES,
            payload:profiles
        })
       

    } catch (err) {
        dispatch({
            type:PROFILE_ERR
        })
    }
}

//get Profile of particular user

export const getProfileById=(userId)=>async dispatch=>{
   try {
       let resp=await axios.get(`/api/profile/user/${userId}`)
       dispatch({
           type:GET_VISITING_PROFILE,
           payload:resp.data
       })
       resp=await axios.get(`/api/users/${userId}`);
       dispatch({
           type:GET_VISITING_USER, 
           payload:resp.data
       })
   } catch (err) {
      dispatch({
          type:PROFILE_ERR
      })       
   }
}
// clear Visiting Profile
export const clearVisitingProfile=()=>async dispatch=>{
    try {
        dispatch({
            type:CLEAR_VISITING_USER
        })
        dispatch({
            type:CLEAR_VISITING_PROFILE
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