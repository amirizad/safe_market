'use strict';
import user from '../../routes/user_reducer';

export default (state = {
    username:'',
    age: '',
    fname: '',
    lname: '',
    email: '',
    imgurl: '',
    phone: '',
    zip: '',
    errors: ''
  },action) => {
  switch(action.type){
    case "RECEIVE_PROFILE_DATA":
      state={
        ...state,
        age: action.payload.age,
        fname: action.payload.fname,
        lname: action.payload.lname,
        email: action.payload.email,
        imgurl: action.payload.image_url,
        phone: action.payload.phone,
        username: action.payload.username,
        zip : action.payload.zip,
      }
    break;

    case "UPLOAD_PROFILE_IMAGE":
      state={
        ...state,
        [action.payload.id]: action.payload.value
      }
    break;

    case "UPDATE_PROFILE_FORM":
      state={
        ...state,
        [action.payload.id]: action.payload.value
      }
    break;
    
    case "PROFILE_FORM_ERROR":
      state={
        ...state,
        errors: action.payload
      };
    break;
    
    case "CLOSE_PROFILE_FORM_ERROR":
      console.log(action.payload);
      state={
        ...state,
        errors: action.payload
      };
    break;
  }
  return state;
}