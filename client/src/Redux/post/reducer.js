import {GET_ALL_POST, POST_ERR, UPDATE_LIKE,REMOVE_LIKE, DELETE_POST, ADD_POST,GET_POST, ADD_COMMENT, DELETE_COMMENT} from './actionTypes';

const initialState={
    posts:[],
    post:null,
    loading:true,
}

const reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case GET_ALL_POST:
            return {
                ...state,
                posts:payload,
                loading:false,
            }
        case GET_POST:
            return {
                ...state,
                post:payload,
                loading:false,
            }
        case POST_ERR:
            return {
                ...state,
                loading:false
            }

        case UPDATE_LIKE:
        case REMOVE_LIKE:
            return {
                ...state,
                posts:state.posts.map(post=>post._id==payload.id?{...post,likes:payload.likes}:post),
                loading:false
            }
        case ADD_COMMENT:
        case DELETE_COMMENT:
            return {
                ...state,
                post:{...state.post,comments:payload.comments},
                loading:false
            }
        case DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter(post=>post._id!==payload),
                loading:false
            };
        
        case ADD_POST:
            return {
                ...state,
                posts:[payload,...state.posts],
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;