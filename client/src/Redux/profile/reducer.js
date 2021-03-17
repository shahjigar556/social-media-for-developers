import { CLEAR_PROFILE, GET_PROFILE,PROFILE_ERR,CREATE_PROFILE,UPDATE_PROFILE, DELETE_ACCOUNT} from "./actionTypes";

const initialState={
    profile:null,
    profiles:[],
    loading:true,
    repos:[],
    errors:{}
}

const reducer=(state=initialState,action)=>{
       const {type,payload}=action;
       switch(type){
           case GET_PROFILE:
           case UPDATE_PROFILE:
               return{
                   ...state,
                   profile:payload,
                   loading:false,
               }
           case CLEAR_PROFILE:
           case DELETE_ACCOUNT:
               return {
                   ...state,
                   profile:null,
                   loading:false
               }
           case PROFILE_ERR:
               return {
                   ...state,
                   profile:null,
                   loading:false
               }

            case CREATE_PROFILE:
                return {
                    ...state,
                    profile:payload,
                    loading:false
                }
           default:
               return state;

       }
}

export default reducer;