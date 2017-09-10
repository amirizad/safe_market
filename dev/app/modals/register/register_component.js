'use strict';

import React from 'react';

export default (props)=>{
    return(
        <div id="login-overlay" className="modal-dialog ">
            <div className="modal-content register">
                <form className="form-horizontal" onChange={props.actions.updateRegForm} onSubmit={(event)=>props.actions.submitRegForm(event,props.data)}>
                    <fieldset>
                
                        {/* <!-- Form Name --> */}
                        <div className="modal-header">
                            <h4 className="modal-title" id="registrationLabel">CREATE AN ACCOUNT</h4>
                            <a type="button" href='#/home' id="closeRegistrationModal" className="close" data-dismiss="register" aria-label="Close">
                                <span className="fa fa-close" aria-hidden="true" />
                                <span className="sr-only">Close</span>
                            </a>
                        </div>
                        <br/>
                        
                        { props.data.errors && 
                        <div  className="alert alert-danger col-md-offset-2 col-md-8" role="alert">
                            <strong>Oh snap!</strong> {props.data.errors}
                            <a onClick={props.actions.closeRegError} style={{float:"right"}}>X</a>
                        </div>
                        }

                        {/* <!-- Text input--> */}
                        <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="username">Username</label>  
                        <div className="col-md-4">
                        <input id="username" pattern='^[A-Za-z0-9_-]{3,15}$' title='Username can only use A-Z, 0-9, _, -.   Must be 3-15 characters long.' name="username" type="text" placeholder="Username" className="form-control input-md" required="true" value={props.data.username}/>
                        </div>
                        </div>

                        {/* <!-- Text input--> */}
                        <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="email">Email</label>  
                        <div className="col-md-4">
                        <input value={props.data.email} id="email" name="email" pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' title='Please enter a valid email address' type="text" placeholder="Email address" className="form-control input-md" required="true"/>
                        </div>
                        </div>

                        {/* <!-- Text input--> */}
                        <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="mphone">Mobile Phone</label>  
                        <div className="col-md-4">
                        <input value={props.data.mphone} pattern='^(0|[1-9][0-9]*)$' title='Please enter only numbers.' id="mphone" name="mphone" type="text" placeholder="Phone Number" className="form-control input-md" required="true"/>
                        </div>
                        </div>

                        {/* <!-- Text input--> */}
                        <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="age">Age</label>  
                        <div className="col-md-4">
                        <input value={props.data.age} id="age" pattern='\d{1,2}(?!\d)|100' title='Please enter your age.' name="age" type="text" placeholder="Age" className="form-control input-md" required="true"/>
                        </div>
                        </div>
                       
                       {/* <!-- Text input--> */}
                       <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="zip">Zip Code</label>  
                        <div className="col-md-4">
                        <input value={props.data.zip} id="zipcode" pattern='^\d{5}(?:[-\s]\d{4})?$' title='Please enter a valid 5 digit zip code.' name="zip" type="text" placeholder="Zip Code" className="form-control input-md" required="true"/>
                    
                        </div>
                        </div>
                
                        {/* <!-- Password input--> */}
                        <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="password">Password </label>
                        <div className="col-md-4">
                            <input value={props.data.password} id="password" pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$' title='Please enter a password with 1 Capital Letter, 1 Number, with a minumim of 8 characters.' name="password" type="password" placeholder="Password " className="form-control input-md" required="true"/>
                        </div>
                        </div>
                
                        {/* <!-- Password input--> */}
                        <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="repassword">Confirm Password</label>
                        <div className="col-md-4">
                            <input value={props.data.repassword} id="repassword" name="repassword" type="password" placeholder="Password" className="form-control input-md" required="true"/>
                        </div>
                        </div>
                
                        {/* <!-- Button (Double) --> */}
                        <div className="form-group">
                        <div className='col-md-2'>
                        </div>
                        <div className="col-md-4">
                        <a href='#/home/login' className="btn btn-success btn-block">Login</a>
                        </div>
                        <div className="col-md-4">
                        <p><button type="submit" className="btn btn-info btn-block">Register</button></p>
                        </div>
                        </div>
                
                        </fieldset>
                        </form>
                </div>
        </div>
        
    );
};