'use strict';

import React from 'react';

export default (props)=>{
    return(
      // <!--React App Renders Here-->
    <div className='container'>
        <h1>&nbsp;&nbsp; My Listings</h1>
        <div className="goods-page">
          <div className="goods-data clearfix">
            <div className="table-wrapper-responsive">
            <table summary="Shopping cart">
              <thead>
              <tr>
                <th className="goods-page-image"><br></br>Item Image</th>
                <th className="goods-page-description"><br></br>Title/Description</th>
                <th className="goods-page-description" style={{textAlign:"center"}}><br></br>Category&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-stock" style={{textAlign:"center"}}><br></br>Quantity&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-price" style={{textAlign:"center"}}><br></br>Price&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Unit&nbsp;&nbsp;&nbsp;<br></br>Type&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"right"}}><br></br>Offers&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer <br></br> Accepted&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Seller&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Confirm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Buyer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Confirm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"right"}}>Seller&nbsp;&nbsp;&nbsp;<br></br>Rating&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"right"}}><br></br>Messages</th>
              </tr>
              </thead>
              <tbody>
                {props.data.myListings.length > 0 &&
        
                  props.data.myListings.map((listing, index)=>{
                    return(
                        <tr key={listing.id}>
                        <td className="goods-page-image">
                          <a href={listing.item_image_url}><img src={listing.item_image_url} alt={listing.title}></img></a>
                        </td>
                        <td className="goods-page-description">
                          <h3><a href="#" data-toggle="modal" data-target="#itemModal" onClick={()=>{ props.actions.sendMyListingData(props.data.myListings[index])}} style={{color:"#2196F3"}}><strong>{listing.title}</strong></a></h3>
                          <p><strong>Description:&nbsp;</strong>{listing.description}</p>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{listing.category}</p>
                        </td>
                        <td className="goods-page-stock" style={{textAlign:"center"}}>
                          {listing.quantity}
                        </td>
                        <td className="goods-page-price" style={{textAlign:"center"}}>
                          <strong style={{color:"#151515"}}><span>$</span>{listing.price}</strong>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{listing.unit_type}</p>
                        </td>
                        <td className="goods-col" style={{textAlign:"center"}}>
                          <a className={parseInt(listing.offer_cnt)>0 ? "search-goods offers-goods" : ""} onClick={()=>{ props.actions.setItemOffersItemId(props.data.myListings[index].id)}} href="/#/itemoffers"></a>
                              {parseInt(listing.offer_cnt)>0 ? <p>&nbsp;</p> : <p style={{margin: "4px"}}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></p>}
                        </td>  
                      <td className="goods-col" style={{textAlign:"center"}}>
                              {(() => {
                                        console.log(listing.offer_accepted_ind);
                                        console.log(listing.offer_cnt);
                                        if (listing.offer_accepted_ind===1) 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;Yes</p>
                                        if (listing.offer_accepted_ind===0 && parseInt(listing.offer_cnt)>0)
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;No</p>
                                        else 
                                            return <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></p>
                                        })()}
                          {/* <p>{listing.offer_accepted_ind>0 ? "Y" : listing.offer_cnt>0 ? "N" : "-"}</p> */}
                        </td>
                        <td className="accept-offer-col" style={{textAlign:"center"}}>
                            <span style={{textAlign: "center", width: '100%'}}>
                                <button style={{margin: "0px", padding: "0px", textAlign: "center", float: "none", border: "transparent", background:"transparent"}} className="btn btn-default btn-xs accept-offer-button" type="button"
                                    value={listing.Id}
                                    onClick={()=>{props.actions.updateSellerSaleConfirm(props.data.myListings[index].UserId, props.data.myListings[index].id)}}>
                                  <i className={
                                        (() => {  
                                          if (listing.offer_accepted_ind === null || listing.offer_accepted_ind === 0)
                                              return ""
                                          else 
                                            return (listing.seller_sale_confirm == 0 ? "fa fa-square-o" : "fa fa-check-square-o")
                                        })()}
                                    style={listing.seller_sale_confirm == 0 ? {margin: "0px",color:"#151515", background:"transparent",padding: "0px", fontSize: "20px"} : {margin: "0px",color:"#151515", background:"transparent",padding: "0px", fontSize: "20px"}}></i>
                                </button>
                                {listing.offer_accepted_ind ===  null || listing.offer_accepted_ind === 0 ? <span><strong>-</strong></span> : ""}</span>  
                       </td> 
                       <td className="goods-col" style={{textAlign:"center"}}>
                              {(() => {
                                        if (listing.offer_accepted_ind === null || listing.offer_accepted_ind === 0)
                                            return (<span><strong>-</strong></span>)
                                        else 
                                          return (listing.buyer_sale_confirm === 1 ? <p>Yes</p> : <p>No</p>)
                                        })()}
                        </td>
                        <td className="goods-col" style={{textAlign:"center"}}>
                          {listing.seller_rating===null ? <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;-</strong></p> : <p>{listing.seller_rating}</p>}
                        </td>   
                      <td className="goods-col" style={{textAlign:"center"}}>  
                        <a className={parseInt(listing.message_cnt)>0 ? "search-goods messages-goods" : ""} href="#/mymessages"></a>
                        {parseInt(listing.message_cnt)>0 ? <p>&nbsp;</p> : <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong>}
                      </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    )};