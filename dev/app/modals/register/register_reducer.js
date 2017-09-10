'use strict';

export default (state={
    username:'',
    email:'',
    mphone:'',
    age:'',
    fname:'',
    lname:'',
    zip:'',
    password:'',
    repassword:'',
    errors:''
},action)=>{

    switch(action.type){
        case "UPDATE_REG_FORM":
            state={
                ...state,
                [action.payload.id]:action.payload.value
            };
        break;

        case "REG_ERROR":
           state={
               ...state,
               errors:action.payload
           };
        break;
        
        case "CLOSE_REG_ERROR":
        console.log(action.payload);
           state={
               ...state,
               errors:action.payload
           };
        break;
    }

    return state;
};