'use strict';

//import react, render, provider to server the store values and store.
import React from "react";
import {render} from "react-dom";
import {Provider} from 'react-redux';
import store from './store';

//import Main App
import Main from './App';

render(
    <Provider store={store}>
       <Main />
     </Provider>
, window.document.getElementById('app'));