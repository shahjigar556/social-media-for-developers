import { CLEAR_PROFILE, GET_PROFILE,PROFILE_ERR,CREATE_PROFILE,UPDATE_PROFILE, DELETE_ACCOUNT,GET_PROFILES, GET_VISITING_PROFILE, GET_VISITING_USER, CLEAR_VISITING_USER,CLEAR_VISITING_PROFILE} from "./actionTypes";

const initialState={
    profile:null,
    profiles:[],
    loading:true,
    repos:[],
    errors:{},
    visitingProfile:null,
    visitingUser:null
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

           case GET_PROFILES:
               return {
                   ...state,
                   profiles:payload,
                   loading:false
               }

           case GET_VISITING_PROFILE:
                return {
                    ...state,
                    visitingProfile:payload,
                    loading:false
                }
            case CLEAR_VISITING_PROFILE:
                return {
                    ...state,
                    laoding:false,
                    visitingProfile:null
                }
            case GET_VISITING_USER:
                return {
                    ...state,
                    visitingUser:payload,
                    loading:false
                }

            case CLEAR_VISITING_USER:
                return {
                    ...state,
                    visitingUser:null,
                    loading:false
                }
           case CLEAR_PROFILE:
           case DELETE_ACCOUNT:
               return {
                   ...state,
                   profile:null,
                   visitingProfile:null,
                   visitingUser:null,
                   loading:false
               }
           case PROFILE_ERR:
               return {
                   ...state,
                   profile:null,
                   visitingProfile:null,
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