'use strict';

import {createStore,combineReducers,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";

//Reducers
import userReducer from './routes/user_reducer';
import navbarReducer from './header/navbar/navbar_reducer';
import navbarLowerReducer from './header/navbar_lower/navbar_lower_reducer';
import mainSliderReducer from './body/main_slider/main_slider_reducer';
import newListingsReducer from './body/new_listings/new_listings_reducer';
import randomListingsReducer from './body/random_listings/random_listings_reducer';
import stepsReducer from './body/steps/steps_reducer';
import footerReducer from './footer/footer_reducer';
import loginReducer from './modals/login/login_reducer';
import registerReducer from './modals/register/register_reducer';
import navbarSearchReducer from './header/navbar_lower/navbar_search/navbar_search_reducer';
import myListingsReducer from './body/my_listings/my_listings_reducer';
import myOffersReducer from './body/my_offers/my_offers_reducer';
import ItemOffersReducer from './body/item_offers/item_offers_reducer';
import myPurchasesReducer from './body/my_purchases/my_purchases_reducer';
import searchResultsReducer from './body/search_results/search_results_reducer';
import createListingReducer from './body/create_listing/create_listing_reducer';
import profileReducer from './body/profile/profile_reducer';
import editProfileReducer from './body/edit_profile/edit_profile_reducer';
import changePasswordReducer from './body/change_password/change_password_reducer';
import messagePreviewReducer from './header/navbar/message_preview/message_preview_reducer';
import verificationReducer from './modals/verification/verification_reducer';
import itemReducer from './modals/item/item_reducer';
import errorValidateReducer from './body/error_validate/error_validate_reducer';
import chatBoxReducer from './body/chat_box/chat_box_reducer';
import makeOfferReducer from './modals/make_offer/make_offer_reducer';
import ratingReducer from './body/rating/rating_reducer';
import rateSellerReducer from './modals/rate_seller/rate_seller_reducer';

export default createStore(combineReducers({
    userReducer,
    navbarReducer,
    navbarLowerReducer,
    mainSliderReducer,
    newListingsReducer,
    randomListingsReducer,
    stepsReducer,
    footerReducer,
    loginReducer,
    registerReducer,
    navbarSearchReducer,
    myListingsReducer,
    myOffersReducer,
    ItemOffersReducer,
    myPurchasesReducer,
    searchResultsReducer,
    createListingReducer,
    profileReducer,
    editProfileReducer,
    changePasswordReducer,
    messagePreviewReducer,
    verificationReducer,
    itemReducer,
    errorValidateReducer,
    chatBoxReducer,
    makeOfferReducer,
    ratingReducer,
    rateSellerReducer
}),{},applyMiddleware(logger,thunk));