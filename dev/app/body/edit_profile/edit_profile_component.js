'use strict';

import React from 'react';

export default (props) => {
  return(
    <div className="row margin-bottom-40">
      <div className="col-md-offset-2 col-md-8 editprofile">
        { props.data.editprofile.errors && 
          <div  className="alert alert-danger col-md-offset-2 col-md-8" role="alert">
              <strong>Oh snap!</strong> {props.data.editprofile.errors}
              <a onClick={props.actions.closeProfileFormError} style={{float:"right"}}>X</a>
          </div>
        }
        <h1>Edit My Profile</h1>
        <div className="content-form-page">
          <form
            className="form-horizontal form-without-legend"
            onChange={props.actions.updateProfileForm}
            onSubmit={(event) => props.actions.submitProfileForm(event, props.data.editprofile)}
          >
            <div className="form-group">
              <div className="col-lg-offset-1 col-lg-10 text-center">
                <p className="text-center">
                  <img
                    className="userpic"
                    src={props.data.editprofile.imgurl}
                  />
                </p>
                <div className="input-group">
                  <div className="input-group-btn">
                    <button
                      type="button"
                      className="btn btn-info"
                      id="uploadbtn"
                      onClick={props.actions.uploadProfilePic}
                    >Upload</button>
                  </div>
                  <input
                    type="text"
                    id="editimgurl"
                    name="editimgurl"
                    className="form-control"
                    placeholder="Image URL"
                    value={props.data.editprofile.imgurl}
                  />
                </div>
                <p className="help-block">Upload your photo or insert your photo URL.</p>
              </div>
            </div>
            <hr />
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="editfname">First Name</label>
              <div className="col-lg-10">
                <input
                  type="text"
                  id="editfname"
                  name="editfname"
                  className="form-control"
                  value={props.data.editprofile.fname}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="editlname">Last Name</label>
              <div className="col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  id="editlname"
                  name="editlname"
                  rows="6"
                  value={props.data.editprofile.lname}
                />
              </div>
            </div>
    
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="editage">Age</label>
              <div className="col-lg-10">
                <input
                  type="number"
                  className="form-control"
                  id="editage"
                  name="editage"
                  min="18"
                  value={props.data.editprofile.age}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="editzip">Zip Code</label>
              <div className="col-lg-10">
                <input
                  type="text"
                  id="editzip"
                  name="editzip"
                  className="form-control"
                  value={props.data.editprofile.zip}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="editphone">Phone</label>
              <div className="col-lg-10">
                <input
                  type="text"
                  id="editphone"
                  name="editphone"
                  className="form-control"
                  value={props.data.editprofile.phone}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="editemail">Email</label>
              <div className="col-lg-10">
                <input
                  type="text"
                  id="editemail"
                  name="editemail"
                  className="form-control"
                  value={props.data.editprofile.email}
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