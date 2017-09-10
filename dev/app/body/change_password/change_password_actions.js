'use strict';

import axios from 'axios';

export const passShowHide = (event) => {
	const id = event.target.id;
	const input = $('#' + id.substring(3, id.length));
  $('#' + id).toggleClass("fa-eye-slash fa-eye");
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
	};
	return({
		type:"PASS_SHOW_HIDE",
		payload: {
				id: id,
				value: event.target.value
		}
	});
};

export const updatePasswordForm = (event) => {
	const id = event.target.id;
	const value = event.target.value;
	if ( id === 'newpass') {
		let element = document.getElementById('confirmpass');
		element.setAttribute("pattern", value);
	}
	return({
		type:"UPDATE_PASSWORD_FORM",
		payload:{
			id: id,
			value: value
		}
	});
};

export const submitPasswordForm = (passwordFormData) => {
	return dispatch => axios({
		method:'POST',
		responseType:'json',
		url:'/api/changepassword',
		data: passwordFormData
	}).then((response)=>{
		console.log(response);
		location.href='#/profile';
	}).catch((err) => {
		console.log(err);
		if (err) dispatch({
			type:'PASSWORD_FORM_ERROR',
			payload: err.response.data.message
		});
	});
};

export const closePasswordFormError = () => {
	return({
		type:"CLOSE_PASSWORD_FORM_ERROR",
		payload: ""
	});
};