'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreateListingLayout from './create_listing_component';
import {updateListingForm,submitListingForm, closeListingError, uploadPic} from './create_listing_actions';

class Listing extends Component{
  render(){
    return(
      <CreateListingLayout data={this.props.data} actions={this.props.actions} />
    );
  }
};

function mapStateToProps(state){
  return{
    data: state.createListingReducer
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions : {
      uploadListingForm:()=>{
        event.preventDefault();
        dispatch(uploadPic());
      },
      updateListingForm: (event) => {
        dispatch(updateListingForm(event));
      },
      submitListingForm:(event, listFormData)=>{
        event.preventDefault();
        console.log(listFormData);
        dispatch(submitListingForm(listFormData));
      },
      closeListingError:()=>{
        dispatch(closeListingError());
      }
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Listing);