'use strict';
import axios from 'axios';

export const getMyListings = ()=>{
    return dispatch => axios({
            url: '/api/mylistings',
            response:'json',
            method:'GET'
        }).then((data)=>{
            console.log(data.data);
            dispatch({
                type:'RECEIVE_MY_LISTINGS',
                payload: data.data
            });
        });
};

export const sendMyListingData = (myListingData)=>{
    return ({
        type:"RECEIVE_ITEM_MODAL",
        payload: myListingData
    });
};

export const setItemOffersItemId = (itemOffersItemId)=>{
    return({
        type:'UPDATE_ITEM_OFFERS_ITEM',
        payload: itemOffersItemId
    });
};

export const updateSellerSaleConfirm = (UserId, ItemId)=>{
    console.log('UserId:'+ UserId + ", ItemId: "+ ItemId);
    return dispatch => axios.put('/api/sellerconfirmsale/',{UserId: UserId, ItemId: ItemId}
    ).then((response)=>{
            console.log(response);
            return dispatch(getMyListings());
    }).catch((err) => {
        console.log(err);
    })
};


