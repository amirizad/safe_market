'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router,Route,Link,Switch, Redirect} from 'react-router-dom';

import {authenticateUser} from './user_actions';

import Navbar from './../header/navbar/navbar_container';
import NavbarLower from './../header/navbar_lower/navbar_lower_container';
import MainSlider from './../body/main_slider/main_slider_container';
import NewListings from './../body/new_listings/new_listings_container';
import RandomListings from './../body/random_listings/random_listings_container';
import Steps from './../body/steps/steps_container';
import Footer from './../footer/footer_container';
import LoginModal from './../modals/login/login_container';
import RegisterModal from './../modals/register/register_container';
import SearchResults from './../body/search_results/search_results_container';
import MyListings from './../body/my_listings/my_listings_container';
import MyOffers from './../body/my_offers/my_offers_container';
import ItemOffers from './../body/item_offers/item_offers_container';
import MyPurchases from './../body/my_purchases/my_purchases_container';
import CreateListing from './../body/create_listing/create_listing_container';
import Profile from './../body/profile/profile_container';
import EditProfile from './../body/edit_profile/edit_profile_container';
import ChangePassword from './../body/change_password/change_password_container';
import VerificationModal from './../modals/verification/verification_container';
import ItemModal from './../modals/item/item_container';
import ErrorValidate from './../body/error_validate/error_validate_container';
import ChatBox from './../body/chat_box/chat_box_container';
import OfferModal from './../modals/make_offer/make_offer_container';
import ItemDetails from './../body/item_details/item_details_container';
import rateSeller from './../modals/rate_seller/rate_seller_container';

class Routing extends Component{
    componentDidMount(){
        this.props.authenticateUser;
    }
    render(){
        return(
            <Router>
                <div>
                    <Redirect exact path='/' to="/home"/>
                    <Route path='/' component={Navbar} />
                    <Route path='/' component={NavbarLower} />
                    <Route path='/home' component={MainSlider} />
                    <div className='container'>
                        <Route path='/home' component={NewListings} />
                        <Route path='/home' component={RandomListings}/>
                        <Route path='/results' component={SearchResults}/>

                        <Route path='/mylistings' render={()=>{
                            return (this.props.data.verified_seller ?  
                            <MyListings/> : <ErrorValidate/>)
                        }}/>
                        <Route path='/myoffers' render={()=>{
                            return (this.props.data.verified_seller ?  
                            <MyOffers/> : <ErrorValidate/>)
                        }}/>
                        <Route path='/createlisting' render={()=>{
                            return (this.props.data.verified_seller ?  
                            <CreateListing/> : <ErrorValidate/>)
                        }}/>
                        <Route path='/itemoffers' render={()=>{
                            return (this.props.data.verified_seller ?  
                            <ItemOffers/> : <ErrorValidate/>)
                        }}/>

                        <Route path='/item-details' render={()=>{
                            return (this.props.data.loggedIn ?  
                            <ItemDetails/> : <Redirect to='/home/login'/>)
                        }}/>

                        <Route path='/mypurchases' component={MyPurchases}/>
                        <Route path ='/profile' component={Profile} />
                        <Route path ='/edit-profile' component={EditProfile} />
                        <Route path ='/change-password' component={ChangePassword} />
                    </div> 
                    <Route path='/home/register' component={RegisterModal}/>
                    <Route path='/home/login' component={LoginModal}/>
                    <Route path='/home/verify' component={VerificationModal}/>
                    <Route path='/' component={ItemModal}/>
                    <Route path='/' component={ChatBox} />
                    <Route path='/' component={OfferModal}/>
                    <Route path='/' component={rateSeller} />
                    {!this.props.data.loggedIn &&
                    <Route path='/' component={Steps}/>
                    }
                    <Route path='/' component={Footer}/>     
                                                    
                </div>
            </Router>
        );
    }
};

function mapStateToProps(state){
    return{
        data: state.userReducer
    };
};

function mapDispatchToProps(dispatch){
    return {
        actions:{
            authenticateUser: dispatch(authenticateUser())
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Routing);