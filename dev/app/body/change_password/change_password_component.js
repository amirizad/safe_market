'use strict';

import React from 'react';

export default (props) => {
  return(
    <div className="row margin-bottom-40">
      <div className="col-md-offset-2 col-md-8 editprofile">
        { props.data.errors && 
          <div  className="alert alert-danger col-md-offset-2 col-md-8" role="alert">
              <strong>Oh snap!</strong> {props.data.errors}
              <a onClick={props.actions.closePasswordFormError} style={{float:"right"}}>X</a>
          </div>
        }
        <h1>Change My Password</h1>
        <div className="content-form-page">
          <form
            className="form-horizontal form-without-legend"
            onChange={props.actions.updatePasswordForm}
            onSubmit={(event) => props.actions.submitPasswordForm(event, props.data)}
          >

            <div className="form-group">
              <label className="col-lg-3 control-label" htmlFor="oldpass">Old Password<span className="require">*</span></label>
              <div className="col-lg-9">
                <input
                  type="password"
                  id="oldpass"
                  name="oldpass"
                  className="form-control"
                  value={props.data.oldpass}
                  required
                />
                <span
                  id="foroldpass"
                  className="fa fa-fw fa-eye-slash show-icon toggle-password"
                  onClick={props.actions.passShowHide}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label" htmlFor="newpass">New Password<span className="require">*</span></label>
              <div className="col-lg-9">
                <input
                  type="password"
                  className="form-control"
                  id="newpass"
                  name="newpass"
                  value={props.data.newpass}
                  pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
                  title='Please enter at least 8 characters including one number, one lowercase and one uppercase letter.'
                  required
                />
                <span
                  id="fornewpass"
                  className="fa fa-fw fa-eye-slash show-icon toggle-password"
                  onClick={props.actions.passShowHide}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-3 control-label" htmlFor="confirmpass">Confirm Password<span className="require">*</span></label>
              <div className="col-lg-9">
                <input
                  type="password"
                  id="confirmpass"
                  name="confirmpass"
                  className="form-control"
                  value={props.data.confirmpass}
                  required
                />
                <span
                  id="forconfirmpass"
                  className="fa fa-fw fa-eye-slash show-icon toggle-password"
                  onClick={props.actions.passShowHide}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8 col-md-offset-2 padding-left-0 padding-top-20">
                <a href="#/profile" className="btn btn-default">Cancel</a>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};