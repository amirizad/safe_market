'use strict';

import React, {Component} from 'react';

//Import navbar
import Navbar from './header/navbar/navbar_container';
import NavbarLower from './header/navbar_lower/navbar_lower_container';

export default class Main extends Component{
    render(){
        return(
            <div>
            <Navbar />
            <NavbarLower />
            </div>
        );
    }
};