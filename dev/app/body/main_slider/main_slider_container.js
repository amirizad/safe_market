'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainSliderLayout from './main_slider_component';

class MainSlider extends Component{
    render(){
        return(
            <MainSliderLayout />
        );
    }
};

function mapStateToProps(state){
    return(state.mainSliderReducer);
}

function mapDispatchToProps(dispatch){
    return{

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MainSlider);