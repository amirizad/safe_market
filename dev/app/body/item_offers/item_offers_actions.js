'use strict';
import axios from 'axios';


export const getItemOffers = (ItemId)=>{
    return dispatch => axios({
            url: `/api/itemoffers/${ItemId}`,
            response:'json',
            method:'GET'
        }).then((data)=>{
            console.log(data.data);
            dispatch({
                type:'RECEIVE_ITEM_OFFERS',
                payload: data.data
            });
        });
};


export const updateOfferAcceptedInd = (UserId, OfferId, ItemId)=>{
    console.log('UserId:'+ UserId + ", OfferId: " + OfferId + ", ItemId: "+ ItemId);
    return dispatch => axios.put('/api/acceptoffer/',{UserId: UserId, OfferId: OfferId, ItemId: ItemId}
    ).then((response)=>{
            console.log(response);
            return dispatch(getItemOffers(ItemId));
    }).catch((err) => {
        console.log(err);
    })
};