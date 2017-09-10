'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import ChatBoxLayout from './chat_box_component';
import {closeChat, sendMsg, updateMsg, liveChat, getMessages} from './chat_box_actions';

const socket = io.connect(window.location.hostname);
// const socket = io.connect("localhost:3000");

class ChatBox extends Component{
    componentDidUpdate(){
        var fromId = this.props.data.chat.newMessage.ToId;
        var toId = this.props.data.user.id;
        var item = this.props.data.chat.newMessage.ItemId;

        socket.removeAllListeners();
        socket.on(`new_message_from_${fromId}_to_${toId}`,(res)=>{
            this.props.actions.liveChat(fromId, item);
            
        });
    }
    render(){
        return(
            <ChatBoxLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:{
            chat: state.chatBoxReducer,
            user: state.userReducer
        } 
    });
};

function mapDispatchToProps(dispatch){
    return({
        actions:{
            closeChat: ()=>{
                dispatch(closeChat());
            },
            updateMsg:(event)=>{
                dispatch(updateMsg(event));
            },
            sendMsg: (newMessage)=>{
                dispatch(sendMsg(newMessage));
            },
            liveChat: (ToId, ItemId)=>{
                dispatch(liveChat(ToId,ItemId));
            }
        }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(ChatBox);