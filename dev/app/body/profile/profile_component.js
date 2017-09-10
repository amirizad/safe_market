'use strict';

import React from 'react';

export default (props)=>{
    return(
      <div className="col-sm-12 profilepage margin-bottom-40">
        <h1>My Profile</h1>

        <div className="content-page">
          <div className="row">
            <div className="col-sm-3">
              <ul>
                <li className="text-center"><img className="userpic" src={props.data.user.image_url} /></li><hr />
                <li><span className="info-name">First Name: </span>{props.data.user.fname}</li>
                <li><span className="info-name">Last Name: </span>{props.data.user.lname}</li>
                <li><span className="info-name">Phone No.: </span>{props.data.user.mphone}</li>
                <li><span className="info-name">Email: </span>{props.data.user.email}</li>
                <li><span className="info-name">Age: </span>{props.data.user.age}</li>
                <li><span className="info-name">Location Zip Code: </span>{props.data.user.zip}</li><hr className="visible-xs" />
              </ul>
            </div>
            <div className="col-sm-9">
              <h3>My Profile</h3>
              <ul>
                <li><span className="fa fa-edit" /><a href="#/edit-profile">Edit my profile</a></li>
                <li><span className="fa fa-key" /><a href="#/change-password">Change my password</a></li>
              </ul>
              <hr />

              <h3>My Activity</h3>
              <ul>
                <li><span className="fa fa-shopping-bag" /><a href="#/mypurchases">View My Purchases</a></li>
                <li><span className="fa fa-shopping-cart" /><a href="#/myoffers">View My Offers</a></li>
                {/* <li><a href="#/profile">View my return offers</a></li> */}
              </ul>
              <hr />

              <h3>My Listings</h3>
              <ul>
                <li><span className="fa fa-plus-square" /><a href="#/createlisting">Create New Listing</a></li>
                <li><span className="fa fa-list-alt" /><a href="#/mylistings">View My Listings</a></li>
              </ul>          
            </div>
          </div>
        </div>
      </div>
    );
  };