'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemDetailsLayout from './item_details_component';
import {liveChat} from './item_details_actions';

class ItemDetails extends Component{
    render(){
        return(
            <ItemDetailsLayout data={this.props.data} actions={this.props.actions} />
        );
    }
};

function mapStateToProps(state){
    return({
        data:{
            item: state.itemReducer.selected
        }
    });
}

function mapDispatchToProps(dispatch){
    return{
        actions:{
            liveChat: (ToId,ItemId)=>{
                dispatch(liveChat(ToId,ItemId));
            }
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemDetails);