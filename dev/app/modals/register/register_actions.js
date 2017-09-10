'use strict';

import axios from 'axios';

export const updateRegForm = (event)=>{
    let id = event.target.id;
    if(id === 'zipcode'){
        id = 'zip';
    }

    return({
        type:"UPDATE_REG_FORM",
        payload:{
            id: id,
            value: event.target.value
        }
    });
};

export const submitRegForm = (userData)=>{
    return dispatch => axios({
        method:'POST',
        responseType:'json',
        url:'/api/register',
        data:userData
    }).then((response)=>{
        console.log(response.data);
        dispatch({
            type: "LOAD_USER_PROFILE",
            payload: response.data
        });
        location.reload('/#/home');
    }).catch((err) => {
        console.log(err);
        if (err) dispatch({
            type:'REG_ERROR',
            payload: err.response.data.message
        });
    });
};

export const closeRegError = ()=>{
    return({
        type:"CLOSE_REG_ERROR",
        payload: ""
    });
};