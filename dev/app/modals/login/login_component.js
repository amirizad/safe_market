'use strict';

import React from 'react';

export default (props)=>{
    return(
        <div id="login-overlay" className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title" id="loginLabel">LOGIN TO YOUR ACCOUNT</h4>
                <a href='#/home' type="button" id="closeLoginModal" className="close" data-dismiss="modal" aria-label="Close">
                    <span className="fa fa-close" aria-hidden="true" />
                    <span className="sr-only">Close</span>
                </a>
            </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="well">
                                <form id="loginForm" onChange={props.actions.updateLoginForm} onSubmit={(event)=>{props.actions.submitLoginForm(event,props.data)}} method="POST" action="#" noValidate="novalidate">
                                    <div className="form-group">
                                        <label htmlFor="username" className="control-label">Username</label>
                                        <input type="text" className="form-control" id="username" name="username" value={props.data.username} required="" title="Please enter you username" placeholder="example@gmail.com"/>
                                        <span className="help-block"></span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="control-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" value={props.data.password} required="" title="Please enter your password"/>
                                        <span className="help-block"></span>
                                    </div>
                                    <div id="loginErrorMsg" className="alert alert-error hide">Wrong username og password</div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" name="remember" id="remember"/> Remember login
                                        </label>
                                        <p className="help-block">(Do not check this on a public computer)</p>
                                    </div>
                                    <button type="submit" className="btn btn-success btn-block">Login</button>
                                    <a href="#" className="btn btn-default btn-block">Forgot Password?</a>
                                </form>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <p className="lead">New? <span className="text-success">Register Here</span></p>
                            <ul className="list-unstyled" style={{lineHeight: "2"}}>
                                <li><span className="fa fa-check text-success"></span> Make Offers</li>
                                <li><span className="fa fa-check text-success"></span> Get the Latest Listings In Your Zip</li>
                                <li><span className="fa fa-check text-success"></span> Contact Sellers</li>
                                <li><span className="fa fa-check text-success"></span> Rate Sellers</li>
                                <li><span className="fa fa-check text-success"></span> Create Listings<small> (only after validation)</small></li>
                            </ul>
                            <p><a href="#/home/register" className="btn btn-info btn-block">Register Now!</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};