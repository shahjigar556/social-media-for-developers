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
          console.log(state)
          console.log("Remove alert")
          return state.filter(alert=>alert.id!=action.payload.id)
     default:
         return state;
    }
}

export default reducer;