'use strict';

export default (state = {
    title:'',
    description:'',
    category:'',
    price:'',
    quantity:'',
    unittype:'',
    imgurl:'',
    errors:''
  },action) => {
  switch(action.type){
    case "UPLOAD_LISTING_FORM":
      state={
        ...state,
        [action.payload.id]: action.payload.value
      }
    break;

    case "UPDATE_LISTING_FORM":
      state={
        ...state,
        [action.payload.id]: action.payload.value
      }
    break;

    case "CLEAR_NEW_LISTING_DATA":
      state=action.payload;
    break;
    
    case "LISTING_ERROR":
      state={
        ...state,
        errors: action.payload
      };
    break;
    
    case "CLOSE_LISTING_ERROR":
    console.log(action.payload);
      state={
        ...state,
        errors: action.payload
      };
    break;
  }
  return state;
}