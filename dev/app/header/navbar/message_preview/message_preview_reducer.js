'use strict';

export default (state={
    messages: []
},action)=>{
    switch(action.type){
        case "RECEIVE_MESSAGES":
            state={
                ...state,
                messages:action.payload
            }
        break;
    }

    return state;
};
    
    