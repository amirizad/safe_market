'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import StepsLayout from './steps_component';

class Steps extends Component{
    render(){
        return(
            <StepsLayout />
        );
    }
};

function mapStateToProps(state){
    return(state.stepsReducer);
}

function mapDispatchToProps(dispatch){
    return{

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Steps);