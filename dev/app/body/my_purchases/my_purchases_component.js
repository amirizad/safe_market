'use strict';

import React from 'react';
import moment from 'moment';

export default (props)=>{
    return(
      // <!--React App Renders Here-->
    <div className='container'>
        <h1>&nbsp;&nbsp; My Purchases</h1>
        <div className="goods-page">
          <div className="goods-data clearfix">
            <div className="table-wrapper-responsive">
            <table summary="Shopping cart">
              <thead>
              <tr>
                <th className="goods-page-image">Item <br></br>Image&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description"><br></br>Title/Description</th>
                <th className="goods-page-description" style={{textAlign:"center"}}><br></br> Category&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-stock" style={{textAlign:"center"}}><br></br> Quantity&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-price" style={{textAlign:"center"}}><br></br>Price&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Unit&nbsp;&nbsp;&nbsp;&nbsp; <br></br>Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp; <br></br>Amt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Date&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Offer&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Accepted&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Buyer&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Confirm&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Seller&nbsp;&nbsp;&nbsp;&nbsp;<br></br>Confirm&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"center"}}>Seller&nbsp;&nbsp;&nbsp;&nbsp; <br></br>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"right"}}>Seller&nbsp;&nbsp;&nbsp;<br></br>Rating&nbsp;&nbsp;&nbsp;</th>
                <th className="goods-page-description" style={{textAlign:"right"}}><br></br>Messages</th>
              </tr>
              </thead>
              <tbody>
                {props.data.myPurchases.length > 0 &&
        
                  props.data.myPurchases.map((purchase, index)=>{
                    return(
                        <tr key={purchase.ItemId}>
                        <td className="goods-page-image">
                          <a href={purchase.item_image_url}><img src={purchase.item_image_url} alt={purchase.title}></img></a>
                        </td>
                        <td className="goods-page-description">
                          <h3><a href="#" data-toggle="modal" data-target="#itemModal" onClick={()=>{ props.actions.sendItemDetailData(props.data.myPurchases[index])}} style={{color:"#2196F3"}}><strong>{purchase.title}</strong></a></h3>
                          <p><strong>Description:&nbsp;</strong>{purchase.description}</p>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{purchase.category}</p>
                        </td>
                        <td className="goods-page-stock" style={{textAlign:"center"}}>
                          {purchase.quantity}
                        </td>
                        <td className="goods-page-price" style={{textAlign:"center"}}>
                          <strong style={{color:"#151515"}}><span>$</span>{purchase.price}</strong>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{purchase.unit_type}</p>
                        </td>

                        <td className="goods-page-price" style={{textAlign:"center"}}>
                          <strong style={{color:"#151515"}}><span>$</span>{purchase.offer_amt}</strong>
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>{moment(purchase.updatedAt).format('MM/DD/YYYY')}</p>
                        </td> 
                        <td className="goods-col" style={{textAlign:"center"}}>
                              {(() => {
                                        console.log(purchase.offer_accepted_ind);
                                        if (purchase.offer_accepted_ind===1) 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;Yes</p>
                                        else 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;No</p>
                                        })()}
                          {/* <p>{purchase.offer_accepted_ind>0 ? "Y" : purchase.offer_cnt>0 ? "N" : "-"}</p> */}
                        </td> 
                        <td className="goods-col" style={{textAlign:"center"}}>
                              {(() => {
                                    
                                        if (purchase.buyer_sale_confirm===1) 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;Yes</p>
                                        else 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;No</p>
                                        })()}
                           {/* <p>{purchase.offer_accepted_ind>0 ? "Y" : purchase.offer_cnt>0 ? "N" : "-"}</p> */}
                        </td>
                        <td className="goods-col" style={{textAlign:"center"}}>
                              {(() => {
                                        if (purchase.seller_sale_confirm===1) 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;Yes</p>
                                        else 
                                            return <p>&nbsp;&nbsp;&nbsp;&nbsp;No</p>
                                        })()}
                          {/* <p>{purchase.offer_accepted_ind>0 ? "Y" : purchase.offer_cnt>0 ? "N" : "-"}</p> */}
                        </td>
                        <td className="goods-page-description" style={{textAlign:"center"}}>
                          <p>&nbsp;&nbsp;{purchase.seller_name}</p>
                        </td>
                        <td className="goods-col" style={{textAlign:"center"}}>
                        {/* <a className={purchase.seller_rating===null ? "add-goods" : ""} href="#/rateseller"></a> */}
                          {purchase.seller_rating===null ?<a onClick={()=>{props.actions.receiveRating(purchase.UserId,purchase.ItemId,purchase.seller_rating,purchase.seller_rating)}}>Rate</a>: <strong>{purchase.seller_rating}</strong>}
                          {/* <Rating 
                            id = {purchase.UserId}
                            itemid = {purchase.Itemid}
                            rank = {(purchase.seller_rating === null ? null : parseFloat(purchase.seller_rating).toFixed(1))}
                            ranked = {(purchase.seller_rating === null ? false : true)}
                            updateRanking ={props.actions.updateRanking}
                            submitRanking = {props.actions.submitRanking}
                          /> */}
                        </td>  
                      <td className="goods-col" style={{textAlign:"center"}}>  
                        <a className={parseInt(purchase.message_cnt)>0 ? "search-goods messages-goods" : ""} href="#/mymessages"></a>
                        {parseInt(purchase.message_cnt)>0 ? <p>&nbsp;</p> : <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong>}
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