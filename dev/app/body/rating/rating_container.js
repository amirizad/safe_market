'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import RatingLayout from './rating_component';
import {updateRanking, submitRanking} from './rating_actions';

class Rating extends Component{

    render(){
        return(
            <RatingLayout id = {this.props.data.id} itemid = {this.props.data.itemid} rank = {this.props.data.rank} ranked = {this.props.data.ranked} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data: state.ratingReducer
    });
}

function mapDispatchToProps(dispatch){
    return{
        actions:{
            updateRanking:(event)=>{
                dispatch(updateRanking(event));
            },
            submitRanking:(rank,ItemId,event)=>{
                event.preventDefault();
                dispatch(submitRanking(rank,ItemId));
            }
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Rating);