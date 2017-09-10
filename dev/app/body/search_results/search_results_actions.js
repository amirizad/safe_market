'use strict';

export const sendListingData = (listingData)=>{
    return ({
        type:"RECEIVE_ITEM_MODAL",
        payload: listingData
    });
};