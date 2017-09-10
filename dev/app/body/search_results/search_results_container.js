import React,{Component} from 'react';
import {connect} from 'react-redux';
import SearchResultsLayout from './search_results_component';
import {sendListingData} from './search_results_actions';

class SearchResults extends Component{
    render(){
        return(
            <SearchResultsLayout data={this.props.data} actions={this.props.actions}/>
        );
    }
};

function mapStateToProps(state){
    return({
        data:state.searchResultsReducer
    });
};

function mapDispatchToProps(dispatch){
    return({
        actions:{
            sendListingData:(listingData)=>{
                dispatch(sendListingData(listingData));
            }
        }
        
    });
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchResults);