'use strict';

import axios from 'axios';

export const logout = ()=>{
    return dispatch => axios({
        method:'GET',
        response:'json',
        url:'/api/logout'
    }).then((response)=>{
        dispatch({
            type:'USER_LOGOUT'
        });

        location.reload('/#/home');

    }).catch((err)=>{
        if(err) throw err;
    });
};

