'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditProfileLayout from './edit_profile_component';
import {uploadPic, updateProfileForm, submitProfileForm, closeProfileError} from './edit_profile_actions';

class EditProfile extends Component{
  render(){
    return(
      <EditProfileLayout data={this.props.data} actions={this.props.actions} />
    );
  }
};

function mapStateToProps(state){
  return({
    data:{
      editprofile: state.editProfileReducer,
      user: state.userReducer
    }
  });
}  

function mapDispatchToProps(dispatch){
  return{
    actions : {
      uploadProfilePic: () => {
        event.preventDefault();
        dispatch(uploadPic());
      },
      updateProfileForm: (event) => {
        dispatch(updateProfileForm(event));
      },
      submitProfileForm: (event, profileFormData) => {
        event.preventDefault();
        console.log(profileFormData);
        dispatch(submitProfileForm(profileFormData));
      },
      closeProfileFormError: () => {
        dispatch(closeProfileFormError());
      }
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);