'use strict';

import axios from 'axios';

export const getNewListings =()=>{
    return dispatch => axios({
        url:'/api/newlistings',
        response:'json',
        type:'GET'
    }).then((response)=>{
        console.log(response);
        dispatch({
            type:'RECEIVE_NEW_LISTINGS',
            payload: response.data
        });
    });
};

export const sendListingData = (listingData)=>{
    return ({
        type:"RECEIVE_ITEM_MODAL",
        payload: listingData
    });
};