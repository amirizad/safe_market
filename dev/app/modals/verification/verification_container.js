'use strict';

import { connect } from 'react-redux'
import VerificationLayout from './verification_component';
import { sendCode, updateVerifyForm, resendCode , verifyCode} from './verification_actions';

import React, { Component } from 'react'

class VerificationModal extends Component {
    render() {
        return (
           <VerificationLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
}


const mapStateToProps = (state) => {
    return ({
        data:{
            verify: state.verificationReducer,
            user: state.userReducer
        } 
    });
}

const mapDispatchToProps = (dispatch)=>{
    return({
        actions:{
            sendCode:(event,regPhone,enteredPhone)=>{
                dispatch(sendCode(event,regPhone,enteredPhone));
            },
            updateVerifyForm:(event)=>{
                dispatch(updateVerifyForm(event));
            },
            resendCode: (event)=>{
                dispatch(resendCode(event));
            },
            verifyCode: (event,code)=>{
                dispatch(verifyCode(event,code));
            }
        }
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(VerificationModal);