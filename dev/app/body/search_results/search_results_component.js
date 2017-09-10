'use strict';

import React from 'react';

export default (props)=>{
    return(
      <div>
      {/* <!-- BEGIN SIDEBAR & CONTENT --> */}
      <div className="row margin-bottom-40">
        {/* <!-- BEGIN SIDEBAR --> */}
        <div className="sidebar col-md-3 col-sm-5">
          <div className="sidebar-filter margin-bottom-25">
            <h2>Search categories</h2>
            <hr/>
            <div className="checkbox-list">
              <label><input type="checkbox"/>Automobile</label>
              <label><input type="checkbox"/>Furniture</label>
              <label><input type="checkbox"/>Services</label>
              <label><input type="checkbox"/>Toys/Games</label>
              <label><input type="checkbox"/>Clothes</label>
              <label><input type="checkbox"/>Electronics</label>
              <label><input type="checkbox"/>Appliance</label>
            </div>
          </div>
        </div>
        {/* <!-- END SIDEBAR --> */}
        {/* <!-- BEGIN CONTENT --> */}
        <div className="col-md-9 col-sm-7">
          <div className="content-search margin-bottom-20">
            <div className="row">
              <div className="col-md-6">
                <h1 style={{fontSize:"24px"}}>Search result for <em>{props.data.term || props.data.zipcode ||  props.data.category|| 'All'}</em></h1>
              </div>
            </div>
          </div>
          {/* <!-- BEGIN PRODUCT LIST --> */}
            {(props.data.results.length > 0 ?
            <div>
            <div className="row product-list">
              <div className="row list-view-sorting clearfix">
              <div className="col-md-2 col-sm-2 list-view">
                <a href="javascript:;"><i className="fa fa-th-large"></i></a>
                <a href="javascript:;"><i className="fa fa-th-list"></i></a>
              </div>
              <div className="col-md-10 col-sm-10">
                <div className="pull-right">
                  <label className="control-label">Show:</label>
                  <select className="form-control input-sm">
                    <option value="#?limit=24" defaultValue>24</option>
                    <option value="#?limit=25">25</option>
                    <option value="#?limit=50">50</option>
                    <option value="#?limit=75">75</option>
                    <option value="#?limit=100">100</option>
                  </select>
                </div>
                <div className="pull-right">
                  <label className="control-label">Sort&nbsp;By:</label>
                  <select className="form-control input-sm">
                    <option value="#?sort=p.sort_order&amp;order=ASC" defaultValue>Default</option>
                    <option value="#?sort=pd.name&amp;order=ASC">Name (A - Z)</option>
                    <option value="#?sort=pd.name&amp;order=DESC">Name (Z - A)</option>
                    <option value="#?sort=p.price&amp;order=ASC">Price (Low &gt; High)</option>
                    <option value="#?sort=p.price&amp;order=DESC">Price (High &gt; Low)</option>
                    <option value="#?sort=rating&amp;order=DESC">Rating (Highest)</option>
                    <option value="#?sort=rating&amp;order=ASC">Rating (Lowest)</option>
                    <option value="#?sort=p.model&amp;order=ASC">Model (A - Z)</option>
                    <option value="#?sort=p.model&amp;order=DESC">Model (Z - A)</option>
                  </select>
                </div>
              </div>
            </div>
              {props.data.results.map((result, index)=>{
                  return(
                      <div key={result.id} className="col-md-4 col-sm-6 col-xs-12">
                          <div className="product-item">
                            <h3><a href="shop-item.html">{result.title}</a><span style={{float:'right'}}>{result.category}</span></h3>
                              <div className="pi-img-wrapper">
                              <img src={result.item_image_url} className="img-responsive" alt={result.title}/>
                              <div>
                                  <a href={result.item_image_url} className="btn btn-default fancybox-button">Zoom</a>
                                  <a data-toggle="modal" data-target="#itemModal" onClick={()=>{ props.actions.sendListingData(props.data.results[index])}} className="btn btn-default">View</a>
                              </div>
                              </div>
                              <h3 style={{overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis"}}><a href="#">{result.description}</a></h3>
                              <div className="pi-price">{result.price}</div>
                          </div>
                      </div>
                  );
              })}
            </div>
          {/* <!-- BEGIN PAGINATOR --> */}
          <div className="row">
            <div className="col-md-4 col-sm-4 items-info">Items 1 to {props.data.results.length} of {props.data.results.length} total</div>
            <div className="col-md-8 col-sm-8">
              <ul className="pagination pull-right">
                <li><a href="#">&laquo;</a></li>
                <li><span>1</span></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
            </div>
          </div>
          {/* <!-- END PAGINATOR --> */}
          </div>
           : 
          <div className="col-md-4 col-sm-6 col-xs-12">
            
              <h2 style={{fontSize:"22px"}}> Sorry, no results found... </h2>
          
          </div>
           )}
          {/* <!-- PRODUCT ITEM END --> */}
        </div>
        {/* <!-- END CONTENT --> */}
      </div>
      {/* <!-- END SIDEBAR & CONTENT --> */}
      </div>
    );
};