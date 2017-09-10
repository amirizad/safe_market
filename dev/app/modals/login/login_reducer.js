'use strict';

export default (state={
    username:'',
    password:''
},action)=>{
    switch(action.type){
        case "UPDATE_LOGIN_FORM":
            state={
                ...state,
                [action.payload.id]:action.payload.value
            }
        break;
    }
    return state;
};
