'use strict';

export default (state={
    myPurchases:[]
},action)=>{
    switch(action.type){
        case "RECEIVE_MY_PURCHASES":
            state={
                ...state,
                myPurchases: action.payload
            };
        break;
    }
    return state;
};