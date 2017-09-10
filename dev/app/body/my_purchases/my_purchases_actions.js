'use strict';
import axios from 'axios';

export const getMyPurchases = ()=>{
    return dispatch => axios({
            url: '/api/mypurchases',
            response:'json',
            method:'GET'
        }).then((data)=>{
            console.log(data.data);
            dispatch({
                type:'RECEIVE_MY_PURCHASES',
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

export const receiveRating = (id,itemid,rank,ranked)=>{
    rank = (rank === null ? null : parseFloat(purchase.seller_rating).toFixed(1));
    ranked = (ranked === null ? false : true);
    $('#rateModal').modal('show');
    return({
        type:"RECEIVE_RATINGS",
        payload: {
            id,
            itemid,
            rank,
            ranked
        }
    });
    
}



