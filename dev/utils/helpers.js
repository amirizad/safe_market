'use strict';

// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";


const helpers = {

  getSearchResults: (paramTerm, paramZip, paramCategory, paramRadius) => {
     
    const url='https://www.zipcodeapi.com/rest/'
    const APIKey = "vu9ZFfDeXZuqDa4zrcqpliw1Hk2UqvKW0TWG8zU5ypwbzBK1Nbq9tXaaic5IIPEI";
    const format = radius.json;
    var zipcode = paramZip;
    var distance = paramRadius;
    const unitType = "mile";
    
    url=url+APIKey+"/"+format+"/" + zipcode + "/" + distance + "/"+unitType+"?minimal"
    
    axios.get(url)
      .then((results) => {
          var zipcodes=results.zip_codes
        
           return axios.get('/search/',{params: {
            'term': paramTerm,
            'category': paramCategory,
            'zips': zipcodes,
            }
          }).then((results) => {
          return results
          })
      });
  },

  getNewListings: () => {
    return axios.get("/api/newlistings");
  },

  getRandomListings: () => {
    return axios.get("/api/randomlistings");
  },

  getMyListings: () => {
    return axios.get("/api/mylistings");
  },
  
  getMyOffers: () => {
    return axios.get("/api/myoffers");
  },
  
  getMyPurchases: () => {
    return axios.get("/api/mypurchases");
  },

  getItem: (ItemId) => {
    return axios.get("/api/item",{params: {paramItemId: ItemId}});
  },

  postItem: (UserId, title, desc, category, imageUrl, quantity, price, unitType, barterInd) => {
    return axios.post("/api/item", {UserId, title, desc, category, imageUrl, quantity, price, unitType, barterInd});
  },
 
  putItem: (ItemId, title, desc, category, imageUrl, quantity, price, unitType,barterInd) => {
    return axios.put("/api/item", {ItemId, title, desc, category, imageUrl, quantity, price, unitType,barterInd});
  },

  deleteItem:(ItemId)  => {
    return axios.delete("/api/item/" + ItemId)
    .then(function(results)
        {
           return results;
      }
    )
  }
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
