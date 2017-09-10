'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileLayout from './profile_component';

class Profile extends Component{
    render(){
        return(
            <ProfileLayout data={this.props.data} />
        );
    }
};

function mapStateToProps(state){
    return({
        data:{
            user: state.userReducer
        }
    });
}

function mapDispatchToProps(dispatch){
    return{

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);