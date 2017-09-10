'use strict';

import axios from 'axios';

export const updateOfferForm = (event)=>{
    return({
        type:"UPDATE_MAKE_OFFER_FORM",
        payload:{
            id: event.target.id,
            value: event.target.value
        }
    });
};

export const submitOfferForm = (ItemId,offer_amt)=>{
    return dispatch => axios({
        method:'POST',
        responseType:'json',
        url:`api/offer/`,
        data:{
           offer_amt,
           ItemId
        }
    }).then((response)=>{
        document.getElementById('closeOfferModal').click();
        location.href="#/myoffers";
        console.log(response.data);
    }).catch((err) => {
        console.log(err);
    });
};