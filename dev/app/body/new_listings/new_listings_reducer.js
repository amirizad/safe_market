'use strict';

export default (state={
    newListings:[]
},action)=>{
    switch(action.type){
        case 'RECEIVE_NEW_LISTINGS':
            state={
                ...state,
                newListings: action.payload
            }
        break;
    }
    return state;
};