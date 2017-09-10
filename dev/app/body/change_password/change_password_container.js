'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChangePasswordLayout from './change_password_component';
import {passShowHide, updatePasswordForm, submitPasswordForm, closePasswordFormError} from './change_password_actions';

class ChangePassword extends Component{
  render(){
    return(
      <ChangePasswordLayout data={this.props.data} actions={this.props.actions} />
    );
  }
};

function mapStateToProps(state){
  return({
    data:{
      changepassword: state.changePasswordReducer
    }
  });
}  

function mapDispatchToProps(dispatch){
  return{
    actions : {
      passShowHide: (event) => {
        dispatch(passShowHide(event));
      },
      updatePasswordForm: (event) => {
        dispatch(updatePasswordForm(event));
      },
      submitPasswordForm: (event, passwordFormData) => {
        event.preventDefault();
        console.log(passwordFormData);
        dispatch(submitPasswordForm(passwordFormData));
      },
      closePasswordFormError: () => {
        dispatch(closePasswordFormError());
      }
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);