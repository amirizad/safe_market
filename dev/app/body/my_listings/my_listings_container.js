'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyListingsLayout from './my_listings_component';

import {getMyListings, sendMyListingData, setItemOffersItemId, updateSellerSaleConfirm} from './my_listings_actions';

class MyListings extends Component{
    componentWillMount(){
        this.props.actions.getMyListings();
    }
    render(){
        return(
            <MyListingsLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.myListingsReducer
    });
};

function mapDispatchToProps(dispatch){
    return({
       actions:{
           getMyListings:()=>{
               dispatch(getMyListings());
           },
           sendMyListingData:(myListingData)=>{
                dispatch(sendMyListingData(myListingData));
            },
            setItemOffersItemId: (itemOffersItemId)=>{
                dispatch(setItemOffersItemId(itemOffersItemId));
            },
            updateSellerSaleConfirm:(UserId, ItemId)=>{
                dispatch(updateSellerSaleConfirm(UserId, ItemId));
            }
       }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(MyListings);