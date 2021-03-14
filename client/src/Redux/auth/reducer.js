import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERR,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT_USER} from './actionTypes';
import setAuthToken from '../../utils/setAuthToken';
const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    user:null,
    loading:true
}
const reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            setAuthToken(localStorage.token);
            console.log("user registered");
            return {
                ...state,
                token:payload.token,
                loading:false
            }


        case REGISTER_FAIL:
        case LOGIN_FAILURE:
        case LOGOUT_USER:
            localStorage.removeItem('token');
            console.log(localStorage.getItem('token'));
            return {
                ...state,
                isAuthenticated:false,
                token:null,
                user:null
            }

        case USER_LOADED:
            return {
                ...state,
                user:payload,
                isAuthenticated:true,
                loading:false
            }
   
        case AUTH_ERR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated:false,
                user:null
            }
   
        default:
            return state;
    }
}

export default reducer;