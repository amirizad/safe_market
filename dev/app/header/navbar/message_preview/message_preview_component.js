'use strict';

import React from 'react';
import moment from 'moment';

export default function(props){
    var unread = [];
    return(
            <li>
                <div className="dropdown">
                    <a className="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" href="#">Inbox</a>
                    <div className="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">                                            
                        <div className="panel panel-default">
                            <div className="panel-heading">Messages</div> 
                            <div className="panel-body">
                                {props.data.preview.messages.length == 0 &&
                                <div><h1 id='noMessages'>No Messages</h1></div>
                                }
                                {props.data.preview.messages.length > 0 &&
                                props.data.preview.messages.map((message, index)=>{
                                    if(message.read_ind == 0 && message.FromId != props.data.user.id){
                                       unread.push(0)
                                    }
                                    if(index == props.data.preview.messages.length - 1){
                                        if(unread.length > 0){
                                            $('#dropdownMenu1').addClass('unread');
                                        } else {
                                            $('#dropdownMenu1').removeClass('unread');
                                        }
                                    }
                                    return(
                                    <div key={"message-"+index}>
                                        <div className={"message-bubble" + (message.read_ind == 0 && message.FromId != props.data.user.id ? " unreadMessage" : "")} onClick={()=>{props.actions.enableChat(props.data.preview.messages[index].UserId,props.data.preview.messages[index].ItemId,props.data.preview.messages[index].MessageId)}}>
                                            <p style={{textTransform:'capitalize'}} className="text-muted fromUser"><strong>From:</strong> {message.username} <span className='itemText'><strong> Item:</strong> {message.Title}</span> <span style={{float:"right"}}>{moment(message.last_message_dt).format("MM/DD/YYYY")}</span></p>
                                            <p><span  style={{textTransform:'capitalize'}}><strong>Last Message: </strong></span> {message.message_text} </p>
                                        </div>
                                        <hr />
                                    </div>   
                                    );
                                })
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            </li>
    );
};
