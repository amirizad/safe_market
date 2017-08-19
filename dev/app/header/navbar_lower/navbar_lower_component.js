'use strict';

import React from 'react';

export default (props)=>{
    return(
      // <!-- BEGIN HEADER -->
      <div className="header">
        <div className="container">
          <a className="site-logo" href="shop-index.html"><img src="assets/corporate/img/logos/logo-shop-red.png" alt="Chuck_It_Logo"/></a>
  
          <a href="javascript:void(0);" className="mobi-toggler"><i className="fa fa-bars"></i></a>
  
          {/* <!-- BEGIN NAVIGATION --> */}
          <div className="header-navigation">
            <ul>
              <li><a href="#">Menu Item</a></li>
  
              {/* <!-- BEGIN TOP SEARCH --> */}
              <li className="menu-search">
                <span className="sep"></span>
                <i className="fa fa-search search-btn"></i>
                <div className="search-box">
                  <form action="#">
                    <div className="input-group">
                      <input type="text" placeholder="Search" className="form-control"/>
                      <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit">Search</button>
                      </span>
                    </div>
                  </form>
                </div> 
              </li>
              {/* <!-- END TOP SEARCH --> */}
            </ul>
          </div>
          {/* <!-- END NAVIGATION --> */}
        </div>
        {/* <!-- Header END --> */}
      </div>
    );
};