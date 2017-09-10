'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import FooterLayout from './footer_component';

class Footer extends Component{
    render(){
        return(
            <FooterLayout data={this.props.data}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:{
            footer: state.footerReducer
        }
    });
}

function mapDispatchToProps(dispatch){
    return{

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Footer);