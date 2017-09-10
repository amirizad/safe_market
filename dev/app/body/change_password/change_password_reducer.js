'use strict';

export default (state = {
    oldpass:'',
    newpass: '',
    confirmpass: '',
    errors: ''
  },action) => {
  switch(action.type){
    case 'PASS_SHOW_HIDE':
    state={
        ...state,
        [action.payload.id]:action.payload.value
    }
    break;

    case "UPDATE_PASSWORD_FORM":
      state={
        ...state,
        [action.payload.id]: action.payload.value
      }
    break;
    
    case "PASSWORD_FORM_ERROR":
      state={
        ...state,
        errors: action.payload
      };
    break;
    
    case "CLOSE_PASSWORD_FORM_ERROR":
      console.log(action.payload);
      state={
        ...state,
        errors: action.payload
      };
    break;
  }
  return state;
}