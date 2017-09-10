'use strict';

export default (state={
    enabled: false,
    newMessage:{
        ItemId:'',
        ToId: '',
        message_text:''
    },
    messages:[]
}, action)=>{
    switch(action.type){
        case "LOAD_CHAT_CONVERSATION":
            state={
                ...state,
                enabled: true,
                newMessage:{
                    ...state.newMessage,
                    ItemId:action.payload[0].ItemId,
                    ToId: action.payload[0].chat_with_UserId
                },
                messages: action.payload
            };
        break;
        case "CLOSE_CHAT" :
            state={
                ...state,
                enabled: false,
                newMessage:{
                    ItemId:'',
                    ToId: '',
                    message_text:''
                },
                messages:[]
            };
        break;
        case "UPDATE_NEW_MESSAGE_TEXT" :
            state={
                ...state,
                newMessage:{
                    ...state.newMessage,
                    message_text: action.payload
                }
            };
        break;
    }

    return state;
}