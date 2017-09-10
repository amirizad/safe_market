'use strict';

import React from 'react';
import moment from 'moment';

export default (props)=>{
    return(
      // <!--React App Renders Here-->
    <div className='container'>
        <h1>&nbsp;&nbsp; Item Offers</h1>
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
                <th className="goods-page-description" style={{textAlign:"center"}}>Unit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-price" style={{textAlign:"center"}}>Offer &nbsp;&nbsp;&nbsp;&nbsp;<br></br> Amt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br> By&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer &nbsp;&nbsp;&nbsp;&nbsp;<br></br> Dtm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Accepted&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"right"}}><br></br>Messages</th>
              </tr>
              </thead>
              <tbody>
                {props.data.itemOffers.length > 0 &&
        
                  props.data.itemOffers.map((offer, index)=>{
                    return(
                        <tr key={offer.id}>
                        <td className="goods-page-image">
                          <a href={offer.item_image_url}><img src={offer.item_image_url} alt={offer.title}></img></a>
                        </td>
                        <td className="goods-page-description">
                          <h3 style={{color:"151515"}}> <strong>{offer.title}</strong></h3>
                          <p><strong>Description:&nbsp;</strong>{offer.description}</p>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{offer.category}</p>
                        </td>
                        <td className="goods-page-stock" style={{textAlign:"center"}}>
                          {offer.quantity}
                        </td>
                        <td className="goods-page-price" style={{textAlign:"center"}}>
                          <strong style={{color:"#151515"}}><span>$</span>{offer.price}</strong>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{offer.unit_type}</p>
                        </td>
                        <td className="goods-page-price" style={{textAlign:"center"}}>
                          <strong style={offer.offer_accepted_ind==1 ? {color:"red"} : {color:"#151515"}}><span>$</span>{offer.offer_amt}</strong>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{offer.offer_by}</p>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{moment(offer.updatedAt).format('MM/DD/YYYY HH:MM:SS')}</p>
                        </td>
                        <td className="accept-offer-col" style={{textAlign:"center"}}>
                          {/* <?input type="checkbox" value={offer.offer_accepted_ind}></input> */}
                         <span style={{textAlign: "center", width: '100%'}}>
                              <button style={{margin: "0px", padding: "0px", textAlign: "center", float: "none", border: "transparent", background:"transparent"}} className="btn btn-default btn-xs accept-offer-button" type="button"
                                    value={offer.ItemId}
                                    onClick={()=>{props.actions.updateOfferAcceptedInd(props.data.itemOffers[index].UserId, props.data.itemOffers[index].id, props.data.itemOffers[index].ItemId)}}>
                                  <i className={offer.offer_accepted_ind==0 ? "fa fa-square-o" : "fa fa-check-square-o"} style={offer.offer_accepted_ind==0 ? {margin: "0px",color:"#151515", background:"transparent",padding: "0px", fontSize: "20px"} : {margin: "0px",color:"#151515", background:"transparent",padding: "0px", fontSize: "20px"}}></i>    
                              </button>
                          </span> 
                        </td>  
                      <td className="goods-col" style={{textAlign:"center"}}>  
                        <a className={parseInt(offer.message_cnt)>0 ? "search-goods messages-goods" : ""} href="#/mymessages"></a>
                        {parseInt(offer.message_cnt)>0 ? <p style={{margin: "8px"}}>&nbsp;</p> : <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong>}
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