'use strict';

export default (state={
    randomListings:[]
},action)=>{
    switch(action.type){
        case 'RECEIVE_RANDOM_LISTINGS':
            state={
                ...state,
                randomListings: action.payload
            }
        break;
    }
    return state;
};