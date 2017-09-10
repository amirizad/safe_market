'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemOffersLayout from './item_offers_component';

import {getItemOffers, updateOfferAcceptedInd} from './item_offers_actions';

class ItemOffers extends Component{
    componentWillMount(){
        this.props.actions.getItemOffers(this.props.data.currentItem);
    }
    render(){
        return(
            <ItemOffersLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.ItemOffersReducer
    });
};

function mapDispatchToProps(dispatch){
    return({
       actions:{
           getItemOffers:(ItemId)=>{
               dispatch(getItemOffers(ItemId));
           },
           updateOfferAcceptedInd:(UserId, OfferId, ItemId)=>{
            dispatch(updateOfferAcceptedInd(UserId, OfferId, ItemId));
           }
        }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(ItemOffers);