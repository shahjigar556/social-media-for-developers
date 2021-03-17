import {SET_ALERT,REMOVE_ALERT} from './actionTypes';

const initialState=[];

const reducer=(state=initialState,action)=>{
    switch(action.type){
      case SET_ALERT:
        return [...state,{
            id:action.payload.id,
            msg:action.payload.msg,
            alertType:action.payload.alertType
        }];
        break;

      case REMOVE_ALERT:
          const a= state.filter(alert=>alert.id!=action.payload)
          return a;
     default:
         return state;
    }
}

export default reducer;