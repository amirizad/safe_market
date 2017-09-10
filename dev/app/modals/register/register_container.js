'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import RegisterModalLayout from './register_component';
import {updateRegForm,submitRegForm, closeRegError} from './register_actions';
class RegisterModal extends Component{
    render(){
        return(
            <RegisterModalLayout data={this.props.data} actions={this.props.actions} />
        );
    }
};

function mapStateToProps(state){
    return{
        data:state.registerReducer
    };
};

function mapDispatchToProps(dispatch){
    return {
        actions : {
            updateRegForm:(event)=>{
                dispatch(updateRegForm(event));
            },
            submitRegForm:(event,userData)=>{
                event.preventDefault();
                console.log(userData);
                dispatch(submitRegForm(userData));
            },
            closeRegError:()=>{
                dispatch(closeRegError());
            }
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(RegisterModal);