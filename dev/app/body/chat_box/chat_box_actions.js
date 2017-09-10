'use strict';

import axios from 'axios';

export const closeChat = ()=>{
    return({
        type:"CLOSE_CHAT",
        payload: null
    });
};

export const updateMsg = (event)=>{
    console.log(event.key);
    if (event.key == 'Enter') {
        $('#sendChatMsg').click();
        return({
            type:"UPDATE_NEW_MESSAGE_TEXT",
            payload:""
        });
    } else {
        return({
            type:'UPDATE_NEW_MESSAGE_TEXT',
            payload: event.target.value
        });
    }
};

export const sendMsg = (newMessage)=>{
    return dispatch => axios({
        url:`/api/message`,
        method:'POST',
        response:'json',
        data: newMessage
    }).then((data)=>{
        axios({
            url:`/api/itemusermessages/${newMessage.ToId}/${newMessage.ItemId}`,
            response:'json',
            method:'GET'
        }).then((response)=>{
            dispatch({
                type:"LOAD_CHAT_CONVERSATION",
                payload: response.data
            });
            dispatch({
                type:"UPDATE_NEW_MESSAGE_TEXT",
                payload:""
            });
            $('#chatBox').animate({scrollTop: $('#chatBox').prop('scrollHeight')},1000);
        }).catch((err)=>{
            if(err) throw err;
        });
    }).catch((err)=>{
        if (err) throw err;
    });
};

export const liveChat = (ToId,ItemId)=>{
    return dispatch => axios({
        url:`/api/itemusermessages/${ToId}/${ItemId}`,
        response:'json',
        method:'GET'
    }).then((response)=>{
        dispatch({
            type:"LOAD_CHAT_CONVERSATION",
            payload: response.data
        });
        $('#chatBox').animate({scrollTop: $('#chatBox').prop('scrollHeight')},1000);
    }).catch((err)=>{
        if(err) throw err;
    });
};