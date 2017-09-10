'use strict';

import React from 'react';

export default (props)=>{
    return(
      <div className="steps-block steps-block-red">
        <div className="container">
          <div className="row">
            <div className="col-md-4 steps-block-col">
              <i className="fa fa-user-plus"></i>
              <div>
                <h2>Fast signup</h2>
                <em>Complete the signup form within a minute</em>
              </div>
              <span>&nbsp;</span>
            </div>
            <div className="col-md-4 steps-block-col">
              <i className="fa fa-mobile"></i>
              <div>
                <h2>Verification</h2>
                <em>get the verification code on your cell phone</em>
              </div>
              <span>&nbsp;</span>
            </div>
            <div className="col-md-4 steps-block-col">
              <i className="fa fa-sign-in"></i>
              <div>
                <h2>Login</h2>
                <em>Login with your user info and chuck it</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };