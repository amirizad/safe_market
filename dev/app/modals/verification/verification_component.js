'use strict';

import React from 'react';

export default (props)=>{
    return(
        <div id="login-overlay" className="modal-dialog">
            {props.data.user.loggedIn &&
            <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title" id="verifyLabel">Verify Your Account Via Mobile</h4>
                <a href='#/home' type="button" id="closeVerifyModal" className="close" data-dismiss="modal" aria-label="Close">
                    <span className="fa fa-close" aria-hidden="true" />
                    <span className="sr-only">Close</span>
                </a>
            </div>
                <div className="modal-body">
                    { props.data.verify.error && 
                        <div  className="alert alert-danger col-md-offset-2 col-md-8" role="alert">
                            <strong>Oh snap!</strong> {props.data.verify.error}
                        </div>
                    }
                    { props.data.verify.resendMsg && 
                        <div  className="alert alert-success col-md-offset-2 col-md-8" role="alert">
                            <strong>Success! </strong> {props.data.verify.resendMsg}
                        </div>
                    }
                <div className="container-fluid be-detail-container">
                    <div className="row">
                        <div className="col-sm-6 verifyBody">
                            <br/>
                            <img src="https://cdn2.iconfinder.com/data/icons/luchesa-part-3/128/SMS-512.png" className="img-responsive" style={{width:"200px", height:"200px", margin:"0 auto"}}/><br/>
                            
                            <h1 className="text-center">Verify your mobile number</h1><br/>
                            <p className="lead" style={{align:"center"}}></p><p> Thank you for using ChuckIt! To access seller features we require users to validate their mobile phone via text. We do this to prove you are not a bot and to protect our buyers and sellers. When your ready enter the phone number ending in <strong>{props.data.user.mphone.slice(6)}</strong>  and click verify recieve a verification code.</p>  <p></p>
                        <br/>
                        
                            <form onChange={props.actions.updateVerifyForm} id="verify" >
                                {props.data.verify.codeSent == false &&
                                <div className="row">                    
                                <div className="form-group col-sm-8">
                                    <span style={{color:"red"}}></span><input id="enteredPhone" type="text" className="form-control" name="otp" placeholder="Your Phone Number ex: 0123456789" value={props.data.verify.enteredPhone} required="true"/>
                                </div>
                                <button type="submit" onClick={(event)=>{props.actions.sendCode(event,props.data.user.mphone,props.data.verify.enteredPhone)}} className="btn btn-primary  pull-right col-sm-3">Send Code</button>
                                </div>
                                }
                                {props.data.verify.codeSent &&
                                <div>
                                <div className="row">                    
                                <div className="form-group col-sm-8">
                                    <span style={{color:"red"}}></span><input id="enteredCode" type="text" className="form-control" name="otp" placeholder="Please enter the 6 digit verification code." value={props.data.verify.enteredCode} required="true"/>
                                </div>
                                <button type="button" onClick={(event)=>{props.actions.resendCode(event)}} className="btn btn-primary  pull-right col-sm-3">Resend Code</button>
                                </div> 
                                <div className="row">                    
                                <button type="submit" onClick={(event)=>{props.actions.verifyCode(event,props.data.verify.enteredCode)}} className="btn btn-primary col-sm-3 col-sm-offset-4">Verify Code</button>
                                </div> 
                                </div>
                                }
                            </form>
                        <br/><br/>
                        </div>
                    </div>        
                </div>
                </div>
            </div>
            }
        </div>
    );
};