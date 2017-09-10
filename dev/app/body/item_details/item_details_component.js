'use strict';

import React from 'react';
import Rating from '../rating/rating_component';

export default (props)=>{
    return(
      <div className="margin-bottom-40">
        <h3>Item Details</h3>
        <div className="content-page">
          <div className="row">
            <div className="col-xs-5">
              <div className="detail product-main-image" style={{'position': 'relative', 'overflow': 'hidden'}}>
                <img
                  src={props.data.item.item_image_url}
                  alt={props.data.item.title}
                  className="img-responsive"
                />
                <img
                  src={props.data.item.item_image_url}
                  className="zoomImg"
                  style={{'position': 'absolute', 'top': '0px', 'left': '0px', 'opacity': '0', width: '600px', 'height': '800px', 'border': 'none', 'maxWidth': 'none'}}
                />
              </div>              
            </div>
            <div className="col-xs-7">
              <h1>{props.data.item.title}</h1>
              <div className="item-modal-block">
                <div className="price">
                  <strong><span>$</span>{props.data.item.price}<em>({props.data.item.unit_type})</em></strong>
                </div>
              </div>
              <div className="item-modal-block">
                <div className="category">
                  <span><span className="info-name">Category: </span>{props.data.item.category}</span>
                </div>
                <div className="quantity">
                  <span><span className="info-name">Availability: </span>{props.data.item.quantity}</span>
                </div>
                <div className="zip">
                  <span><span className="info-name">Location (Zip Code): </span>{props.data.item.zip}</span>
                </div>
              </div>
              <div className="item-modal-block">
                <p><span className="info-name">Description: </span>{props.data.item.description}</p>
              </div>
              <div className="item-modal-block">
                <p className="seller-info"><span>Seller Information: </span></p>
                <div className="row">
                  <div className="col-xs-2">
                    <img
                      className="sellerimg img-responsive"
                      src={props.data.item.user_image_url}
                      alt="Seller Image"
                    />
                  </div>
                  <div className="col-xs-10">
                    <div className="seller">
                      <span>
                        <span className="info-name">Name: </span>
                        {`${props.data.item.fname} ${props.data.item.lname}`}
                      </span>
                    </div>
                    <div className="seller">
                      <span>
                        <span className="info-name">Location (Zip Code): </span>
                        {props.data.item.zip}
                      </span>
                    </div>

                    {/* RatingLayout */}
                    { props.data.item.seller_avg_rating ? (
                      <Rating 
                          id = {props.data.item.UserId}
                          itemid = {props.data.item.id}
                          rank = {(Math.round(props.data.item.seller_avg_rating *2)/2).toFixed(1)}
                          ranked = 'true'
                      />
                    ) : (
                      <div className="seller">
                        <span><span className="info-name">Seller Rate: </span>N/A (New Seller)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="item-modal-block">
                <a href="#/home"><button className="itembtn btn btn-default">Back</button></a>
                <a onClick={()=>{$('#offerModal').modal('show');}}><button className="itembtn btn btn-info">Make Offer</button></a>
                <a onClick={()=>{props.actions.liveChat(props.data.item.UserId,props.data.item.id)}}><button className="itembtn btn btn-primary">Contact Seller</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };