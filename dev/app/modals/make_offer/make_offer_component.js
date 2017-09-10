'use strict';

import React from 'react';

export default (props)=>{
    return(
        <div className="modal fade" id="offerModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="offerLabel">Make An Offer</h4>
                            <button type="button" id="closeOfferModal" className="close" data-dismiss="modal" aria-label="Close">
                                <span className="fa fa-close" aria-hidden="true" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                                <form className="form-horizontal" onChange={props.actions.updateOfferForm} onSubmit={(event)=>props.actions.submitOfferForm(event,props.data.item.id,props.data.offer.offer_amt)}>
                                    <fieldset>
                                        {/* <!-- Text input--> */}
                                        <div className="form-group" id='makeOfferAmt'>
                                        <label className="col-md-4 control-label" htmlFor="offer_amt">Offer Amount</label>  
                                        <div className="col-md-4">
                                        <input value={props.data.offer.offer_amt} pattern='^(0|[1-9][0-9]*)$' title='Please enter only numbers.' id="offer_amt" name="offer_amt" type="text" placeholder="Offer Amount" className="form-control input-md" required="true"/>
                                        </div>
                                        <div className="col-md-3 ">
                                        <button type="submit" className="btn btn-success btn-block">Make Offer!</button>
                                        </div>
                                        </div>
                                    </fieldset>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        );
};