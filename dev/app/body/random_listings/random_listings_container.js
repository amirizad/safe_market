'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import RandomListingsLayout from './random_listings_component';
import {getRandomListings, sendListingData} from './random_listings_actions';

class RandomListings extends Component{
    componentWillMount(){
        this.props.actions.getRandomListings();
    }
    componentDidUpdate(){
        setTimeout(()=>{
            Layout.init();    
            Layout.initOWL();
            Layout.initImageZoom();
            Layout.initTouchspin();
            Layout.initTwitter();
        },1000);
    }
    render(){
        return(
            <RandomListingsLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.randomListingsReducer
    });
}

function mapDispatchToProps(dispatch){
    return({
        actions:{
            getRandomListings:()=>{
                dispatch(getRandomListings());
            },
            sendListingData:(listingData)=>{
                dispatch(sendListingData(listingData));
            }
        }
    })
};

export default connect(mapStateToProps,mapDispatchToProps)(RandomListings);