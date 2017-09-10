'use strict';

import axios from 'axios';

export const getRandomListings =()=>{
    return dispatch => axios({
        url:'/api/randomlistings',
        response:'json',
        type:'GET'
    }).then((response)=>{
        console.log(response);
        dispatch({
            type:'RECEIVE_RANDOM_LISTINGS',
            payload: response.data
        });
    });
}

export const sendListingData = (listingData)=>{
    return ({
        type:"RECEIVE_ITEM_MODAL",
        payload: listingData
    });
};