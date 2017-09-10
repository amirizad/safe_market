'use strict';

import React from 'react';
import Rating from './../../body/rating/rating_container';

export default (props)=>{
    return(
        <div className="modal fade" id="rateModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="rateLabel">Rate The Seller</h4>
                            <button type="button" id="closerateModal" className="close" data-dismiss="modal" aria-label="Close">
                                <span className="fa fa-close" aria-hidden="true" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{marginLeft:"29%"}}>
                            <Rating />
                        </div>
                    </div>
                </div>
            </div>
        );
};