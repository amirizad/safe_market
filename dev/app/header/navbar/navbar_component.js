'use strict';

import React from 'react';

export default (props)=>{
    return(
        // <!-- BEGIN TOP BAR -->
        <div className="pre-header">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6 additional-nav">
                        If You Can't Sell It Here, Chuck It!
                    </div>
                    {/* {<!-- BEGIN TOP BAR MENU --> */} 
                    <div className="col-md-6 col-sm-6 additional-nav">
                        <ul className="list-unstyled list-inline pull-right">
                            <li><a href="#">{props.data.username}</a></li>
                            <li><a href="#" onClick={props.changeName}>My Wishlist</a></li>
                            <li><a href="#">Checkout</a></li>
                            <li><a href="#">Log In</a></li>
                        </ul>
                    </div>
                    {/* <!-- END TOP BAR MENU --> */}
                </div>
            </div>        
        </div>
        // <!-- END TOP BAR -->
    );
};