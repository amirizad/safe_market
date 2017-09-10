'use strict';

export default (state={
    results:[],
    category:'',
    term:'',
    zipcode:''
},action)=>{
    switch(action.type){
        case "RECEIVE_RESULTS":
            state={
                ...state,
                results: action.payload.results,
                category: action.payload.category,
                term: action.payload.term,
                zipcode: action.payload.zipcode
            };
        break;
    }
    return state;
};