'use strict';

//Import react and deconstruct component
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from './navbar_actions';

//Import navbar component
import NavbarLayout from './navbar_component';

class Navbar extends Component{
	componentDidUpdate(){
		$('ul.drop li.dropdown').hover(function() {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
		}, function() {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
		});
	}
	render(){
		return(
			<NavbarLayout actions={this.props.actions} data={this.props.data} />
		);
	}
}

const mapStateToProps = (state) =>{
	return({
		data:{
			navbar: state.navbarReducer,
			user: state.userReducer
		}
	});
};

const mapDispatchToProps = (dispatch)=>{
	return{
		actions:{
			logout:()=>{
				dispatch(logout());
			}
		}
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);