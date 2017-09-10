'use strict';

import axios from 'axios';

export default (state={
    id: null,
    username:null,
    age: null,
    fname: null,
    lname: null,
    email: null,
    image_url: null,
    mphone: null,
    verified_seller: null,
    zip: null,
    loggedIn: false
},action)=>{
    switch(action.type){
        case "LOAD_USER_PROFILE":
        state = {
            ...state,
            age: action.payload.age,
            fname: action.payload.fname,
            lname: action.payload.lname,
            email: action.payload.email,
            id: action.payload.id,
            image_url: action.payload.image_url,
            mphone: action.payload.phone,
            username: action.payload.username,
            zip : action.payload.zip,
            verified_seller : action.payload.verified_seller,
            loggedIn: true
        }
        break;

        case "USER_LOGOUT" :
            state={
                ...state,
                id: null,
                username:null,
                age: null,
                fname: null,
                lname: null,
                email: null,
                image_url: null,
                mphone: null,
                verified_seller: null,
                zip: null,
                loggedIn: false
            }

        break;
    }

    return state;
};