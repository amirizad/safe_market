'use strict';

import React from 'react';
var moment=require('moment');

export default (props)=>{
    return(
      // <!--React App Renders Here-->
    <div className='container'>
        <h1>&nbsp;&nbsp; My Offers</h1>
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
                <th className="goods-page-description" style={{textAlign:"center"}}>Unit&nbsp;&nbsp;&nbsp;&nbsp; <br></br>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Seller&nbsp;&nbsp;&nbsp;&nbsp; <br></br>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp; <br></br>Amt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Date&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Accepted&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Buyer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Confirm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"right"}}><br></br>Messages</th>
              </tr>
              </thead>
              <tbody>
                {props.data.myOffers.length > 0 &&
        
                  props.data.myOffers.map((offer, index)=>{
                    return(
                        <tr key={offer.ItemId}>
                        <td className="goods-page-image">
                          <a href={offer.item_image_url}><img src={offer.item_image_url} alt={offer.title}></img></a>
                        </td>
                        <td className="goods-page-description">
                          <h3><a href="#" data-toggle="modal" data-target="#itemModal" onClick={()=>{ props.actions.sendItemDetailData(props.data.myOffers[index])}} style={{color:"#2196F3"}}><strong>{offer.title}</strong></a></h3>
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
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{offer.seller_name}</p>
                        </td>
                        <td className="goods-page-price" style={{textAlign:"center"}}>
                          <strong style={{color:"#151515"}}><span>$</span>{offer.offer_amt}</strong>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{moment(offer.updatedAt).format('MM/DD/YYYY')}</p>
                        </td> 
                        <td className="goods-col" style={{textAlign:"center"}}>
                              {(() => {
                                        console.log(offer.offer_accepted_ind);
                                        console.log(offer.offer_cnt);
                                        if (offer.offer_accepted_ind===1) 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;Yes</p>
                                        else 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;No</p>
                                        })()}
                          {/* <p>{offer.offer_accepted_ind>0 ? "Y" : offer.offer_cnt>0 ? "N" : "-"}</p> */}
                        </td> 
                        <td className="accept-offer-col" style={{textAlign:"center"}}>
                            <span style={{textAlign: "center", width: '100%'}}>
                                <button style={{margin: "0px", padding: "0px", textAlign: "center", float: "none", border: "transparent", background:"transparent"}} className="btn btn-default btn-xs accept-offer-button" type="button"
                                    value={offer.ItemId}
                                    onClick={()=>{props.actions.updateBuyerSaleConfirm(props.data.myOffers[index].UserId, props.data.myOffers[index].ItemId)}}>
                                  <i className={
                                    
                                    (()=> { 
                                      if (offer.offer_accepted_ind === 0)
                                        return ""
                                      else    
                                       return  offer.buyer_sale_confirm==0 ? "fa fa-square-o" : "fa fa-check-square-o"})()}
                                       style={offer.buyer_sale_confirm==0 ? {margin: "0px",color:"#151515", background:"transparent",padding: "0px", fontSize: "20px"} : {margin: "0px",color:"#151515", background:"transparent",padding: "0px", fontSize: "20px"}}></i>                 
                                </button>
                                {offer.offer_accepted_ind ===  0 ? <span><strong>-</strong></span> : ""}
                            </span>  
                       </td>        
                      <td className="goods-col" style={{textAlign:"center"}}>  
                        <a className={parseInt(offer.message_cnt)>0 ? "search-goods messages-goods" : ""} href="#/mymessages"></a>
                        {parseInt(offer.message_cnt)>0 ? <p>&nbsp;</p> : <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong>}
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