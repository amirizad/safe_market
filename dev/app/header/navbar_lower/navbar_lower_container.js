'use strict';

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {searchAll} from './navbar_lower_actions';

import NavbarLowerLayout from './navbar_lower_component';

class NavbarLower extends Component{
    render(){
        return(
            <div>
            <NavbarLowerLayout data={this.props.data} actions={this.props.actions}/>
            </div>
        );
    }
};

const mapStateToProps = (state)=>{
    return({
        data:state.navbarLowerReducer
    });
};

const mapDispatchToProps= (dispatch)=>{
    return({
        actions:{
            searchAll: ()=>{
                dispatch(searchAll());
            }
        }
    })
};

export default connect(mapStateToProps,mapDispatchToProps)(NavbarLower);