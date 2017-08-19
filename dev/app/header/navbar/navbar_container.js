'use strict';

//Import react and deconstruct component
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeName} from './navbar_actions';

//Import navbar component
import NavbarLayout from './navbar_component';

class Navbar extends Component{
    render(){
        return(
            <NavbarLayout changeName={this.props.changeName} data={this.props.data} />
        );
    }
}

const mapStateToProps = (state) =>{
    return({
         data: state.navbarReducer
    });
};

const mapDispatchToProps = (dispatch)=>{
    return{
        changeName: ()=>{
            dispatch(changeName());
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);