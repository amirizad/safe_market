'use strict';

import React from 'react';

export default (props)=>{
	return(
    <div className="modal fade" id="itemModal">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h4 className="modal-title" id="myModalLabel">{props.data.item.selected.title}</h4>
						<button type="button" id="closeItemModal" className="close" data-dismiss="modal" aria-label="Close">
							<span className="fa fa-close" aria-hidden="true" />
							<span className="sr-only">Close</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="col-xs-5">
								<div className="product-main-image" style={{position:"relative", overflow:"hidden"}}>
									<img src={props.data.item.selected.item_image_url} alt={props.data.item.selected.title} className="img-responsive" />
									<img src={props.data.item.selected.item_image_url} className="zoomImg" style={{position: 'absolute', top: '0px', left: '0px', opacity: 0, width: '600px', height: '800px', border: 'none', maxWidth: 'none'}} />
								</div>              
							</div>
							<div className="col-xs-7">
								<div className="item-modal-block clearfix">
									<div className="price">
										<strong><span>$</span>{props.data.item.selected.price}<em>({props.data.item.selected.unit_type})</em></strong>
									</div>
								</div>
								<div className="item-modal-block clearfix">
									<div className="category">
										<span><span className="info-name">Category: </span>{props.data.item.selected.category}</span>
									</div>
									<div className="quantity">
										<span><span className="info-name">Availability: </span>{props.data.item.selected.quantity}</span>
									</div>
									<div className="zip">
										<span><span className="info-name">Location (Zip Code): </span>{props.data.item.selected.zip}</span>
									</div>
								</div>
								<div className="item-modal-block">
									<p><span className="info-name">Description: </span>{props.data.item.selected.description}</p>
								</div>
								<div className="item-modal-block">
									<a onClick={()=>{
										document.getElementById('closeItemModal').click(); 
										if(props.data.user.loggedIn){
											location.href='#/item-details'
										} else {
											location.href='#/home/login'
										}  
									}} data-dismiss="modal" className="btn btn-default">More details</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};