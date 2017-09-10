'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyPurchasesLayout from './my_purchases_component';

import {getMyPurchases, sendItemDetailData, receiveRating} from './my_purchases_actions';

class MyPurchases extends Component{
    componentWillMount(){
        this.props.actions.getMyPurchases();
    }
    render(){
        return(
            <MyPurchasesLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.myPurchasesReducer
    });
};

function mapDispatchToProps(dispatch){
    return({
        actions:{
            getMyPurchases:()=>{
                dispatch(getMyPurchases());
            },
            sendItemDetailData:(itemDetailData)=>{
                dispatch(sendItemDetailData(itemDetailData));
            },
            receiveRating:(id,itemid,rank,ranked)=>{
                dispatch(receiveRating(id,itemid,rank,ranked));
            }
        }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(MyPurchases);