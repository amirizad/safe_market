'use strict';

export default (state={
    offer_amt: ''
},action)=>{

    switch(action.type){
        case "UPDATE_MAKE_OFFER_FORM":
            state={
                ...state,
                [action.payload.id]:action.payload.value
            };
        break;
    }

    return state;
};