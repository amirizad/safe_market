'use strict';

export default (state={
    myOffers:[]
},action)=>{
    switch(action.type){
        case "RECEIVE_MY_OFFERS":
            state={
                ...state,
                myOffers: action.payload
            };
        break;
    }
    return state;
};