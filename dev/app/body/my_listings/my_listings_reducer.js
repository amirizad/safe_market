'use strict';

export default (state={
    myListings:[]
},action)=>{
    switch(action.type){
        case "RECEIVE_MY_LISTINGS":
            state={
                ...state,
                myListings: action.payload
            }
        break;
    }
    return state;
};