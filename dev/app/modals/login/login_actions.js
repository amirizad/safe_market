'use strict';

import axios from 'axios';

export const updateLoginForm = (event)=>{
    return({
        type:'UPDATE_LOGIN_FORM',
        payload:{
            id: event.target.id,
            value: event.target.value
        }
    });
};

export const submitLoginForm = (event,userData)=>{
    event.preventDefault();
    console.log(userData);
    return dispatch => axios({
        method:'POST',
        responseType:'json',
        url:'/api/login',
        data:userData
    }).then((response)=>{
        console.log(response.data);
        location.replace('/');
    }).catch((err) => {
        console.log(err);
    });
};