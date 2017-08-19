'use strict';

export default (state = {
    username:'Bryan Hernandez' 
}, action) => {
    switch(action.type){
        case 'CHANGE_NAME':
            state = {
                ...state,
                username: action.payload
            }
            break;
    }

    return state;
};