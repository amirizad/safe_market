'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewListingsLayout from './new_listings_component';
import {getNewListings, sendListingData} from './new_listings_actions';

class NewListings extends Component{
    componentWillMount(){
        this.props.actions.getNewListings();
    }
    render(){
        return(
            <NewListingsLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.newListingsReducer
    });
};

function mapDispatchToProps(dispatch){
    return({
        actions:{
            getNewListings:()=>{
                dispatch(getNewListings());
            },
            sendListingData:(listingData)=>{
                dispatch(sendListingData(listingData));
            }
        }
    })
};

export default connect(mapStateToProps,mapDispatchToProps)(NewListings);