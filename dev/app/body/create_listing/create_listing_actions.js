'use strict';

import axios from 'axios';
import filestack from 'filestack-js';
const client = filestack.init('AeaDruS25RZWbGspX6Fxiz');

export const uploadPic = ()=>{
    return dispatch => client.pick({
        accept: 'image/*',
        maxFiles: 1,
        imageMax: [1024, 1024]
    }).then(function(result) {
      console.log(result);
        dispatch({
            type:"UPLOAD_LISTING_FORM",
            payload:{
                id: 'imgurl',
                value: result.filesUploaded[0].url
            }
        });
    })
};

export const updateListingForm = (event)=>{
    let id = event.target.id;
    const name = event.target.name;
    if(name === 'unitType'){
        id = 'unittype';
    }
    return({
        type:"UPDATE_LISTING_FORM",
        payload:{
            id: id,
            value: event.target.value
        }
    });
};

export const submitListingForm = (listFormData)=>{
    return dispatch => axios({
        method:'POST',
        responseType:'json',
        url:'/api/item',
        data: listFormData
    }).then((response)=>{
        dispatch({
            type:"CLEAR_NEW_LISTING_DATA",
            payload:{
                title:'',
                description:'',
                category:'',
                price:'',
                quantity:'',
                unittype:'',
                imgurl:'',
                errors:'' 
            }
        });
       location.href='#/mylistings';
    }).catch((err) => {
        console.log(err);
        if (err) dispatch({
            type:'LISTING_ERROR',
            payload: err.response.data.message
        });
    });
};

export const closeListingError = ()=>{
    return({
        type:"CLOSE_LISTING_ERROR",
        payload: ""
    });
};