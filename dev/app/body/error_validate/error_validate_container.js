'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import ErrorValidateLayout from './error_validate_component';

class ErrorValidate extends Component{
    render(){
        return(
            <ErrorValidateLayout />
        );
    }
}

function mapStateToProps(state){
    return({

    });
};

function mapDispatchToProps(dispatch){
    return({

    });
};

export default connect(mapStateToProps,mapDispatchToProps)(ErrorValidate);