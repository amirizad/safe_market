'use strict';

export default (state={
    currentItem: '',
    itemOffers:[]
},action)=>{
    switch(action.type){
        case "RECEIVE_ITEM_OFFERS":
            state={
                ...state,
                itemOffers: action.payload
            };
        break;
        case 'UPDATE_ITEM_OFFERS_ITEM':
            state={
                ...state,
                currentItem: action.payload
            }
    }
    return state;
};