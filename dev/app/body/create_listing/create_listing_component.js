'use strict';

import React from 'react';

export default (props) => {
  return(
    <div className="row margin-bottom-40">
      <div className="col-md-offset-2 col-md-8 ">
        { props.data.errors && 
          <div  className="alert alert-danger col-md-offset-2 col-md-8" role="alert">
              <strong>Oh snap!</strong> {props.data.errors}
              <a onClick={props.actions.closeListingError} style={{float:"right"}}>X</a>
          </div>
        }
        <h1>Listing Form</h1>
        <div className="content-form-page">
          <form className="form-horizontal form-without-legend" onChange={props.actions.updateListingForm} onSubmit={(event) => props.actions.submitListingForm(event, props.data)}>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="title">Title <span className="require">*</span></label>
              <div className="col-lg-10">
                <input type="text" id="title" name="title" className="form-control" required value={props.data.title} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="description">Description <span className="require">*</span></label>
              <div className="col-lg-10">
                <textarea className="form-control" id="description" name="description" rows="6" required value={props.data.description}></textarea>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-2 control-label" htmlFor="frmcategory">Category <span className="require">*</span></label>
              <div className="col-md-10">
                <select className="form-control" id="category" name="category" required selected={props.data.category}>
                  <option disabled="" defaultValue>Category</option>
                  <option value="appliance">Appliance</option>
                  <option value="automobile">Automobile</option>
                  <option value="clothes">Clothes</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="service">Service</option>
                  <option value="toys-games">Toys/Games</option>
                </select>
              </div>
            </div>      
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="price">Price <span className="require">*</span></label>
              <div className="col-lg-10">
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input type="number" className="form-control" id="price" name="price" required value={props.data.price} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="quantity">Quantity <span className="require">*</span></label>
              <div className="col-lg-10">
                <input type="number" id="quantity" name="quantity" min="1" className="form-control" required value={props.data.quantity} />
              </div>
            </div>
            <div className="form-group">
              <label className="col-lg-2 control-label" htmlFor="unitType">Unit Type <span className="require">*</span></label>
              <div className="col-lg-10">
                <label className="radio-inline">
                  <input type="radio" name="unitType" value="Per Item" checked={props.data.unittype === 'Per Item'}/> Per item
                </label>
                <label className="radio-inline">
                  <input type="radio" name="unitType" value="Flat Rate" checked={props.data.unittype === 'Flat Rate'} /> Flat rate
                </label>
                <label className="radio-inline">
                  <input type="radio" name="unitType" value="Per Hour" checked={props.data.unittype === 'Per Hour'} /> Per hour
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-2 control-label">Upload image <span className="require">*</span></label>
              <div className="col-lg-10">
                <div className="input-group">
                  <div className="input-group-btn">
                    <input type="button" className="btn btn-default" id="uploadbtn" value="Upload" onClick={props.actions.uploadListingForm} />
                  </div>
                  <input type="text" id="imgurl" name="imgurl" className="form-control" placeholder="Image URL" required value={props.data.imgurl} />
                </div>
                <p className="help-block">Upload your image or insert your image URL.</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8 col-md-offset-2 padding-left-0 padding-top-20">
                <a href="#/profile" className="btn btn-default" >Cancel</a>
                <button className="btn btn-primary" type="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};