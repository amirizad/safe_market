'use strict';

import axios from 'axios';

export const authenticateUser = ()=>{
	return dispatch => axios.get('/api/login').then((userData)=>{
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
		} else {
			return;
		}
	});
};