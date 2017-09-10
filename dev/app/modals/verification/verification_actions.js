'use strict';

import axios from 'axios';

export const sendCode = (event, regPhone, enteredPhone)=>{
    event.preventDefault();
    console.log(regPhone,enteredPhone);
    if (regPhone == enteredPhone){
       return dispatch => axios({
        url:"/api/verificationcode",
        method:"PUT",
        response:"json"
        }).then((response)=>{
            dispatch({
                type:"CODE_SENT",
                payload: true
            });
            dispatch({
                type:"HANDLE_VERIFY_RESEND_MSG",
                payload: "Your verification code has been sent!"
            });
            setTimeout(()=>{
                dispatch({
                    type:"HANDLE_VERIFY_RESEND_MSG",
                    payload: ""
                }); 
            },5000);
        }).catch((err)=>{
            if (err) throw err;
        }); 
    } else {
        console.log("PHONE DOES NOT MATCH");
        return dispatch =>{
            dispatch({
                type:"HANDLE_VERIFY_ERROR",
                payload:"Sorry the number you provided does not match the number used to register. Please try again."
            });
            setTimeout(() =>{
                dispatch({
                    type:'HANDLE_VERIFY_ERROR',
                    payload:''
                });
            },5000);
        }
    }
}

export const resendCode = (event)=>{
    event.preventDefault();
    return dispatch => axios({
    url:"/api/verificationcode",
    method:"PUT",
    response:"json"
    }).then((response)=>{
        dispatch({
            type:"HANDLE_VERIFY_RESEND_MSG",
            payload: "Your verification code has been resent!"
        });
        setTimeout(()=>{
            dispatch({
                type:"HANDLE_VERIFY_RESEND_MSG",
                payload: ""
            }); 
        },5000);
    }).catch((err)=>{
        if (err) throw err;
    });
}

export const verifyCode = (event, code)=>{
    event.preventDefault();
    return dispatch => axios({
        url:`api/verifyuser/${code}`,
        response:'json',
        method:'PUT'
    }).then((response)=>{
        if(response.data.results == 'invalid'){
            dispatch({
                type:"HANDLE_VERIFY_ERROR",
                payload:" The code you entered was invalid. Try again or resend the code!"
            });
            setTimeout(() =>{
                dispatch({
                    type:'HANDLE_VERIFY_ERROR',
                    payload:''
                });
            },5000);
        } else if (response.data.results == 'valid'){
            dispatch({
                type:"HANDLE_VERIFY_RESEND_MSG",
                payload: "Your verification code was accepted! Redirecting..."
            });
            setTimeout(()=>{
                dispatch({
                    type:"HANDLE_VERIFY_RESEND_MSG",
                    payload: ""
                });
                location.href = '/#/home';
                location.reload('/#/home');
            },5000);
        }
    }).catch((err)=>{
        if(err) throw err;
    });
}

export const updateVerifyForm = (event)=>{
    return({
        type:"UPDATE_VERIFY_FORM",
        payload: {
            id:event.target.id,
            value: event.target.value
        }
    })
}