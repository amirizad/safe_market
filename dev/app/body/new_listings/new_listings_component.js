'use strict';

import React from 'react';

export default (props)=>{
    return(
    <div className='container'>
      <div className="row margin-bottom-40">
          {/* <!-- BEGIN SALE PRODUCT --> */}
          <div className="col-md-12 sale-product">
            <h2>Newest Listings</h2>
            {props.data.newListings.length > 0 &&   
            <div className="owl-carousel owl-carousel5">
              
                {props.data.newListings.map((listing , index)=>{
                     return(
                       <div key={listing.id}>
                        <div className="product-item">
                        <h4><span>{listing.category}</span></h4>
                        <div className="pi-img-wrapper">
                          <img src={listing.item_image_url} className="img-responsive" alt={listing.title}/>
                          <div>
                            <a href={listing.item_image_url} className="btn btn-default fancybox-button">Zoom</a>
                            <a data-toggle="modal" data-target="#itemModal" onClick={()=>{ props.actions.sendListingData(props.data.newListings[index])}} className="btn btn-default">View</a>
                          </div>
                        </div>
                        <h3>
                          <a href="#" data-toggle="modal" data-target="#itemModal" onClick={()=>{ props.actions.sendListingData(props.data.newListings[index])}}>
                            {listing.title}
                          </a>
                        </h3>
                        <div className="pi-price">${listing.price}</div>
                        <div className="sticker sticker-new"></div>
                      </div>
                      </div>
                    );
                })}
              
            </div>
            }
            {/* <!-- END SALE PRODUCT --> */}
          </div>
      </div>
    </div>
    );
};