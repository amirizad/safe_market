'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import RateSellerLayout from './rate_seller_component';


class RateSeller extends Component{
    render(){
        return(
            <RateSellerLayout data={this.props.data} actions={this.props.actions} />
        );
    }
};

function mapStateToProps(state){
    return{
        data:{
            rateSeller: state.rateSellerReducer
        }
    };
};

function mapDispatchToProps(dispatch){
    return {
        actions : {
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RateSeller);