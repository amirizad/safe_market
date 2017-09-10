'use strict';

export default (state={
    selected:{}
  },action)=>{
    switch(action.type){
      case "RECEIVE_ITEM_MODAL":
        state={
          ...state,
          selected: action.payload
        }
      break;
    }
    return state;
};
