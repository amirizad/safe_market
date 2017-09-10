'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginModalLayout from './login_component';
import {submitLoginForm,updateLoginForm} from './login_actions';

class LoginModal extends Component{
    render(){
        return(
            <LoginModalLayout actions={this.props.actions} data={this.props.data}/>
        );
    }
};

function mapStateToProps(state){
    return{
        data: state.loginReducer
    };
};

function mapDispatchToProps(dispatch){
    return{
        actions:{
           submitLoginForm:(event,userData)=>{
               console.log(userData);
                dispatch(submitLoginForm(event,userData));
           },
           updateLoginForm:(event)=>{
               dispatch(updateLoginForm(event));
           } 
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginModal);