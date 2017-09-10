'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import NavbarSearchLayout from './navbar_search_component';

import {updateSearchForm, submitSearchForm} from './navbar_search_actions';

class NavbarSearch extends Component{
    render(){
        return(
            <NavbarSearchLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.navbarSearchReducer
    });
};

function mapDispatchToProps(dispatch){
    return({
        actions:{
            updateSearchForm:(event)=>{
                dispatch(updateSearchForm(event));
            },
            submitSearchForm:(event,userData)=>{
                dispatch(submitSearchForm(event,userData));
            }
        }
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(NavbarSearch);