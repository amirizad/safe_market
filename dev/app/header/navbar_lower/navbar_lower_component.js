'use strict';

import React from 'react';
import NavbarSearch from './navbar_search/navbar_search_container';

export default (props)=>{
    return(
      // <!-- BEGIN HEADER -->
      <div className="header">
        <div className="container">
          <a className="site-logo" href="#/home"><img id='logo' src="assets/images/chuckLogo.png" alt="Chuck_It_Logo"/> IT</a>
  
          <a href="javascript:void(0);" className="mobi-toggler"><i className="fa fa-bars"></i></a>
  
          {/* <!-- BEGIN NAVIGATION --> */}
          <div className="header-navigation">
            <ul>
              <li><a onClick={props.actions.searchAll}>Listings |</a></li>
  
              {/* <!-- BEGIN TOP SEARCH --> */}

              <NavbarSearch />

              {/* <!-- END TOP SEARCH --> */}
            </ul>
          </div>
          {/* <!-- END NAVIGATION --> */}
        </div>
        {/* <!-- Header END --> */}
      </div>
    );
};