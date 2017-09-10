'use strict';

import React from 'react';

export default (props)=>{
    return(
        <li className="menu-search">
        <form onChange={props.actions.updateSearchForm} onSubmit={(event)=>{props.actions.submitSearchForm(event,props.data)}}>
            <div className="input-group">
                <div className="input-group-btn search-panel">
                    <select id='category' className="btn dropdown-toggle" value={props.data.category}>
                    <option disabled defaultValue>Category</option>
                    <option value="automobile">Automobile</option>
                    <option value="furniture">Furniture</option>
                    <option value="service">Service</option>
                    <option value="toysgames">Toys/Games</option>
                    <option value="clothes">Clothes</option>
                    <option value="electronics">Electronics</option>
                    <option value="appliance">Appliance</option>
                    </select>
                </div>
                
                <input type="hidden" name="search_param" value="all" id="search_param"/>         
                <input id='term' value={props.data.term} type="text" className="form-control" name="x" placeholder="Search term..."/>
                <input id='zip' value={props.data.zip} type="text" className="form-control" name="x" placeholder="ZipCode..."/>
                <button id='searchBtn' className="btn btn-primary" type="submit">Search</button>
            </div>
        </form>
      </li>
    );
};