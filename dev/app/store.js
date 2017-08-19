'use strict';

import {createStore,combineReducers,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";

//Reducers
import navbarReducer from './header/navbar/navbar_reducer';
import navbarLowerReducer from './header/navbar_lower/navbar_lower_reducer';

export default createStore(combineReducers({
    navbarReducer,
    navbarLowerReducer
}),{},applyMiddleware(logger,thunk));