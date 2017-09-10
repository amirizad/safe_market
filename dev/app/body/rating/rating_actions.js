'use strict';

import axios from 'axios';

export const updateRanking = (event)=>{
    console.log(event.target);
    return({
        type:"UPDATE_RANKING",
        payload:{
          id: 'rank',
          value: event.target.value
        }
    });
  };
  
export const submitRanking = (rank,ItemId)=>{
    return dispatch => axios({
        method:'PUT',
        responseType:'json',
        url:'/api/rateseller',
        data: {
            ItemId,
            rank
        }
    }).then((response)=>{
        axios({
            url: '/api/mypurchases',
            response:'json',
            method:'GET'
        }).then((data)=>{
            console.log(data.data);
            dispatch({
                type:'RECEIVE_MY_PURCHASES',
                payload: data.data
            });
            $('#rateModal').modal('hide');
        });
    }).catch((err) => {
        console.log(err);
        if (err) dispatch({
            type:'LISTING_ERROR',
            payload: err.response.data.message
        });
    });
};
