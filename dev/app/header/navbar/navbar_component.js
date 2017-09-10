'use strict';

import React from 'react';

import MessagePreview from './message_preview/message_preview_container';

export default (props)=>{
	return(
		<div className="pre-header">
			<div className="container">
				<div className="row">
					<div className="col-md-3 col-sm-3 additional-nav">
					{props.data.user.loggedIn == false &&
						<span>If You Can't Sell It Here, Chuck it!</span>
					}
					{props.data.user.loggedIn == true &&
						<span>Welcome, {props.data.user.username}!</span>
					}
					</div>
					<div className="col-md-9 col-sm-9 additional-nav">
						{props.data.user.loggedIn == false &&
						<ul className="list-unstyled list-inline pull-right">
							<li><a href="#/home/login">Login or Register</a></li>
						</ul>
						}
						{props.data.user.loggedIn == true &&
						<ul className="drop list-unstyled list-inline pull-right">
							<li><a href="#/home">Home</a></li>
							<li className="dropdown">
								<a href="#/home">My Account <b className="caret"></b></a>
								<ul className="dropdown-menu">
									<li><a href='#/profile'>My Profile</a></li>
									<li role="separator" className="divider"></li>
									<li><a href='#/mylistings'>My Listings</a></li>
									<li><a href='#/myoffers'>My Offers</a></li>
									<li><a href='#/mypurchases'>My Purchases</a></li>
									<li><a href="#/createlisting">List Item</a></li>
								</ul>
							</li>
							<MessagePreview />
							{props.data.user.verified_seller == false &&
								<li><a href='#/home/verify'>Verify</a></li>
							}
							<li><a href="#" onClick={props.actions.logout}>Logout</a></li>
						</ul>
						}
					</div>
				</div>
			</div>        
		</div>
	);
};