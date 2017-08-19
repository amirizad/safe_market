'use strict';

import React,{Component} from 'react';
import {connect} from 'react-redux';

import NavbarLowerLayout from './navbar_lower_component';

class NavbarLower extends Component{
    render(){
        return(
            <NavbarLowerLayout username={this.props.username}/>
        );
    }
};

const mapStateToProps = (state)=>{
    return(state.navbarLowerReducer);
};

const mapDispatchToProps= (dispatch)=>{
    return{

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(NavbarLower);