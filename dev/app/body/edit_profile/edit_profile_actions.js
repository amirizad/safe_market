'use strict';

import axios from 'axios';
import filestack from 'filestack-js';
const client = filestack.init('AeaDruS25RZWbGspX6Fxiz');

export const uploadPic = () => {
  return dispatch => client.pick({
	accept: 'image/*',
	maxFiles: 1,
	imageMax: [1024, 1024]
  }).then(function(result) {
	dispatch({
		type:"UPLOAD_PROFILE_IMAGE",
		payload:{
			id: 'imgurl',
			value: result.filesUploaded[0].url
		}
	});
  })
};

export const updateProfileForm = (event) => {
	let id = event.target.id;
	const len = id.length;
	id = id.substring(4, len);
	return({
		type:"UPDATE_PROFILE_FORM",
		payload:{
			id: id,
			value: event.target.value
		}
	});
};

export const submitProfileForm = (profileFormData) => {
	return dispatch => axios({
		method:'PUT',
		responseType:'json',
		url:'/api/user',
		data: profileFormData
	}).then((response)=>{
		axios.get('/api/login').then((userData)=>{
				console.log(userData.data);
				if(userData.data.username){
					dispatch({
						type:'LOAD_USER_PROFILE',
						payload:userData.data
					});
					dispatch({
						type:'SET_USER_ZIP',
						payload: userData.data.zip
					});
					dispatch({
						type:'RECEIVE_PROFILE_DATA',
						payload:userData.data,
					});
					location.href='#/profile';
				} else {
					return;
				}
		});
		
	}).catch((err) => {
		console.log(err);
		if (err) dispatch({
			type:'PROFILE_FORM_ERROR',
			payload: err.response.data.message
		});
	});
};

export const closeProfileFormError = () => {
	return({
		type:"CLOSE_PROFILE_FORM_ERROR",
		payload: ""
	});
};