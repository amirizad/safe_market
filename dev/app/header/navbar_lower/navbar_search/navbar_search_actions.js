'use strict';

import axios from 'axios';

export const updateSearchForm =(event)=>{
    return({
        type:'UPDATE_SEARCH_FORM',
        payload:{
            id:event.target.id,
            value:event.target.value
        }
    });
};

export const submitSearchForm = (event,userData)=>{
    event.preventDefault();

    var distance = 5;
    const unitType = "mile";
    var term = (userData.term ? `/${userData.term}` : `/${null}`);
    var category = (userData.category ? `/${userData.category}` : `/${null}`);
    var zipcode = (userData.zip ? `/${userData.zip}` : `/${null}`);
    var urlTest=`/api/search${term}${category}${zipcode}/${distance}/${unitType}/`;
    console.log(urlTest);
    return dispatch => axios({
            url: `/api/search${term}${category}${zipcode}/${distance}/${unitType}/`,
            response:'json',
            method:'GET'
        }).then((data)=>{
            console.log(data.data);
            dispatch({
                type:'RECEIVE_RESULTS',
                payload: {
                    results: data.data,
                    category: userData.category,
                    zipcode: userData.zip,
                    term: userData.term
                }
            });
            location.href='#/results';
        });
};
