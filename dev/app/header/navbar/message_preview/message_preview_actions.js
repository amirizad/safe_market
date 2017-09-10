'use strict';

import axios from 'axios';

export const getMessages = ()=>{
    return dispatch => axios({
        url:"/api/inbox",
        method:"GET"
    }).then((response)=>{
        console.log(response.data);
        dispatch({
            type:"RECEIVE_MESSAGES",
            payload: response.data
        });
    });
};

export const enableChat = (ToId, ItemId, messageId)=>{
    return dispatch => axios({
        url:`/api/itemusermessages/${ToId}/${ItemId}`,
        response:'json',
        method:'GET'
    }).then((response)=>{
        dispatch({
            type:"LOAD_CHAT_CONVERSATION",
            payload: response.data
        });
        axios({
            url:`/api/messageread/${messageId}`,
            response:'json',
            method:'PUT'
        }).then((empty)=>{
            axios({
                url:"/api/inbox",
                method:"GET"
            }).then((newData)=>{
                console.log(newData.data);
                dispatch({
                    type:"RECEIVE_MESSAGES",
                    payload: newData.data
                });
            });
        });
        $('#chatBox').animate({scrollTop: $('#chatBox').prop('scrollHeight')},1000);
    }).catch((err)=>{
        if(err) throw err;
    });
};
