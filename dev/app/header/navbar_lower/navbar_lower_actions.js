'use strict';

export const searchAll = ()=>{
    return dispatch => {
        dispatch({
            type:'UPDATE_SEARCH_FORM',
            payload:{
                id: 'zip',
                value: ''
            }
        });
        dispatch({
            type:'UPDATE_SEARCH_FORM',
            payload:{
                id: 'term',
                value: ''
            }
        });
        dispatch({
            type:'UPDATE_SEARCH_FORM',
            payload:{
                id: 'category',
                value: ''
            }
        });
   
        setTimeout(()=>{
            document.getElementById('searchBtn').click();
        },500);
    }
}