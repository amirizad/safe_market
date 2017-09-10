'use strict';
import axios from 'axios';

export const getMyOffers = ()=>{
    return dispatch => axios({
            url: '/api/myoffers',
            response:'json',
            method:'GET'
        }).then((data)=>{
            console.log(data.data);
            dispatch({
                type:'RECEIVE_MY_OFFERS',
                payload: data.data
            });
        });
};

export const sendItemDetailData = (itemDetailData)=>{
    return ({
        type:"RECEIVE_ITEM_MODAL",
        payload: itemDetailData
    });
};

export const updateBuyerSaleConfirm = (UserId, ItemId)=>{
    console.log('UserId:'+ UserId + ", ItemId: "+ ItemId);
    return dispatch => axios.put('/api/buyerconfirmsale/',{UserId: UserId, ItemId: ItemId}
    ).then((response)=>{
            console.log(response);
            return dispatch(getMyOffers());
    }).catch((err) => {
        console.log(err);
    })
};
