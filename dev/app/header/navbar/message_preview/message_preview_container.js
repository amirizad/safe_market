'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import MessagePreviewLayout from './message_preview_component';
import {getMessages, enableChat} from './message_preview_actions';

// const socket = io.connect(window.location.hostname);
const socket = io.connect("localhost:3000");

class MessagePreview extends Component{
    componentDidMount(){
        this.props.actions.getMessages();

        var toId = this.props.data.user.id;

        socket.on(`new_message_to_${toId}`,(res)=>{
            this.props.actions.getMessages();
        });
    }
    render(){
        return(
            <MessagePreviewLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:{
            preview: state.messagePreviewReducer,
            user: state.userReducer
        }            
    });
};

function mapDispatchToProps(dispatch){
    return({
        actions:{
            getMessages:()=>{
                dispatch(getMessages());
            },
            enableChat:(ToId,ItemId, messageId)=>{
                dispatch(enableChat(ToId,ItemId, messageId));
            }
        }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(MessagePreview);