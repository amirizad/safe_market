'use strict';

export default (state ={
    registeredPhone:'',
    enteredPhone:'',
    codeSent: false,
    enteredCode:'',
    resendMsg:'',
    error:''
} , action) => {
    switch (action.type) {
        case 'UPDATE_VERIFY_FORM':
            state={
                ...state,
                [action.payload.id]:action.payload.value
            }
        break;
        case 'HANDLE_VERIFY_ERROR':
            state={
                ...state,
                error: action.payload
            }
        break;
        case 'CODE_SENT':
            state={
                ...state,
                codeSent: action.payload
            }
        break;
        case 'HANDLE_VERIFY_RESEND_MSG' :
            state={
                ...state,
                resendMsg: action.payload
            }
        break;
    }
    
    return state;
}