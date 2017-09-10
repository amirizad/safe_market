'use strict';

import axios from 'axios';

export const liveChat = (ToId,ItemId)=>{
    console.log(ToId,ItemId)
    return dispatch => axios({
        url:`/api/itemusermessages/${ToId}/${ItemId}`,
        response:'json',
        method:'GET'
    }).then((response)=>{
        console.log(response);
        dispatch({
            type:"LOAD_CHAT_CONVERSATION",
            payload: response.data
        });
        $('#chatBox').animate({scrollTop: $('#chatBox').prop('scrollHeight')},1000);
    }).catch((err)=>{
        if(err) throw err;
    });
};