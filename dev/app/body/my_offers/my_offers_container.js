'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyOffersLayout from './my_offers_component';

import {getMyOffers, sendItemDetailData, updateBuyerSaleConfirm} from './my_offers_actions';

class MyOffers extends Component{
    componentWillMount(){
        this.props.actions.getMyOffers();
    }
    render(){
        return(
            <MyOffersLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.myOffersReducer
    });
};

function mapDispatchToProps(dispatch){
    return({
       actions:{
           getMyOffers:()=>{
               dispatch(getMyOffers());
           },
            sendItemDetailData:(itemDetailData)=>{
            dispatch(sendItemDetailData(itemDetailData)); 
       },
            updateBuyerSaleConfirm: (UserId, ItemId)=>{
                dispatch(updateBuyerSaleConfirm(UserId, ItemId));
            }
    }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(MyOffers);