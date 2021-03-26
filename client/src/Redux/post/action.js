import {GET_ALL_POST, POST_ERR,UPDATE_LIKE,REMOVE_LIKE,DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT} from './actionTypes';
import axios from 'axios';
import {setAlert} from '../alert/actions';


export const getPosts=()=>async dispatch =>{
  try {
    const resp=await axios.get('/api/posts')
    dispatch({
        type:GET_ALL_POST,
        payload:resp.data
    })      
  } catch (err) {
      console.log(err.message);
      dispatch({
          type:POST_ERR
      })
      setAlert('Some error Occured');
  }
}

export const getPost=(id)=>async dispatch=>{
  try {
     const resp=await axios.get(`/api/posts/${id}`);
     dispatch({
       type:GET_POST,
       payload:resp.data
     })
  } catch (err) {
       dispatch({
         type:POST_ERR
       })    
  }
}
export const updateLikes=(id)=>async dispatch=>{
  try {
    const resp=await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type:UPDATE_LIKE,
      payload:{id,likes:resp.data}
    })
    dispatch(setAlert('Post Liked'));
    
  } catch (err) {
    dispatch({
      type:POST_ERR
    })
    
  }
}

export const removeLike=(id)=>async dispatch=>{
  try {
    const resp=await axios.put(`/api/posts/dislike/${id}`);
    dispatch({
      type:REMOVE_LIKE,
      payload:{id,likes:resp.data}
    })
    dispatch(setAlert('Like Removed'));
    
  } catch (err) {
    dispatch({
      type:POST_ERR
    })
    
  }
}


export const deletePost=(id)=>async dispatch=>{
  try {
    await axios.delete(`/api/posts/${id}`)
    dispatch({
      type:DELETE_POST,
      payload:id
    })
    dispatch(setAlert('Post Deleted'));
  } catch (err) {
      dispatch({
        type:POST_ERR
      })
    dispatch(setAlert('Post cannot be deleted'));
  }
}

export const addPost=(formData)=> async dispatch=>{
  try {
    const config={
      headers:{
        'content-type':'application/json'
      }
    }
    const resp=await axios.post('/api/posts',formData,config);
    dispatch({
      type:ADD_POST,
      payload:resp.data
    })
    dispatch(setAlert('Post Added'));
  } catch (err) {
      dispatch({
        type:POST_ERR
      })
  }
}

export const addComment=(id,formData)=>async dispatch=>{
  try {
    const config={
      headers:{
        'content-type':'application/json'
      }
    }
    const resp=await axios.put(`/api/posts/comments/${id}`,formData,config)
    dispatch({
      type:ADD_COMMENT,
      payload:{id,comments:resp.data}
    })
    
  } catch (err) {
    dispatch({
      type:POST_ERR
    })
  }

}

export const deleteComment=(postId,commentId)=>async dispatch=>{
  try {
     const resp=await axios.delete(`/api/posts/delete_comments/${postId}/${commentId}`)
     dispatch({
       type:DELETE_COMMENT,
       payload:{postId,commentId,comments:resp.data}
     })
     dispatch(setAlert('Comment deleted'));
    
  } catch (err) {
    dispatch({
      type:POST_ERR
    })
  }
}