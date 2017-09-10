'use strict';

import React from 'react';
import moment from 'moment';

export default (props)=>{
    return(
        <div>
        {props.data.chat.enabled && 
        <div className="bootstrap snippet">
            <div className="row">
                <div className="col-md-4 col-md-offset-7">
                    <div className="portlet portlet-default">
                        <div className="portlet-heading">
                            <div className="portlet-title">
                                {(props.data.chat.messages[0].chat_with_username
                                ?<h4>{props.data.chat.messages[0].chat_with_username} - {props.data.chat.messages[0].title}</h4>
                                :<h4> Start a chat with this seller! </h4>)
                                }
                            </div>
                            <div className="portlet-widgets">
                                <span className="divider"></span>
                                <a style={{float:"left"}} data-toggle="collapse" data-parent="#accordion" href="#chat"><i className="fa fa-chevron-down"></i></a>
                                <a onClick={props.actions.closeChat}><i className="fa fa-close"></i></a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div id="chat" className="panel-collapse collapse in">
                            <div>
                            <div id="chatBox" className="portlet-body chat-widget" style={{overflowY:"auto", width:"auto", height:"300px"}}>
                                {props.data.chat.messages.length > 0 && props.data.chat.messages[0].createdAt  &&
                                    props.data.chat.messages.map((message,index)=>{
                                        return(
                                            <div key={"chat"+ index}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="media">
                                                            <a className="pull-left" href="#">
                                                                <img className="media-object img-circle" style={{width:'40px'}}src={message.from_user_image_url} alt=""/>
                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading">{message.from_username}
                                                                    <span className="small pull-right">{moment(message.createdAt).format('MM/DD/YYYY hh:mm A')} </span>
                                                                </h4>
                                                                <p>{message.message_text}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            </div>
                            <div className="portlet-footer">
                                <form role="form">
                                    <div className="form-group">
                                        <textarea className="form-control" onKeyDown={props.actions.updateMsg} onChange={props.actions.updateMsg} value={props.data.chat.newMessage.message_text} placeholder="Enter message..."></textarea>
                                        <button type="button" id='sendChatMsg' onClick={()=>{props.actions.sendMsg(props.data.chat.newMessage)}}className="btn btn-default pull-right">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>                
    );
};