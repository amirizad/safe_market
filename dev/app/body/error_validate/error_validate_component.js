'use strict';

import React from 'react';

export default (props)=>{
    return(
        <div className="row margin-bottom-40">
        <div className=" col-md-12 ">
          <h1>Sorry, You've been chucked!</h1>
          <div className="content-form-page" style={{textAlign:"center"}}>
            <img src='/assets/images/chucked_error.jpg'/>
            <h3 style={{textAlign:"center"}}>Please validate your account first to gain access to this page or Chuck It!</h3>
          </div>
        </div>
      </div>
    );
}