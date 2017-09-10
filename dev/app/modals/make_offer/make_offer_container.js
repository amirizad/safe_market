'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import MakeOfferModalLayout from './make_offer_component';
import {updateOfferForm,submitOfferForm} from './make_offer_actions';

class OfferModal extends Component{
    render(){
        return(
            <MakeOfferModalLayout data={this.props.data} actions={this.props.actions} />
        );
    }
};

function mapStateToProps(state){
    return{
        data:{
            offer: state.makeOfferReducer,
            item: state.itemReducer.selected
        }
    };
};

function mapDispatchToProps(dispatch){
    return {
        actions : {
            updateOfferForm:(event)=>{
                dispatch(updateOfferForm(event));
            },
            submitOfferForm:(event,item,offer_amt)=>{
                event.preventDefault();
                dispatch(submitOfferForm(item,offer_amt));
            }
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(OfferModal);