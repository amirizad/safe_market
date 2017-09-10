'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ItemModalLayout from './item_component';

class ItemModal extends Component{
    componentDidUpdate(){
        Layout.initImageZoom();
    }
    render(){
        return(
            <ItemModalLayout data={this.props.data}/>
        );
    }
};

function mapStateToProps(state){
    return{
        data: {
            item: state.itemReducer,
            user: state.userReducer
        }
    };
};

function mapDispatchToProps(dispatch){
    return{
      
     };

};


export default connect(mapStateToProps,mapDispatchToProps)(ItemModal);