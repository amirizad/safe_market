'use strict';

module.exports = (express, passport,db,bcrypt,request,SMS,io)=>{

    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);

     router.route('/login')
        .get((req,res,next)=>{
            console.log(req.isAuthenticated());
            console.log(req.user);
            if(req.isAuthenticated()){
                res.json(req.user)
            } else {
                res.json({
                    message:'User not logged in'
                });
            }
        })
        .post(passport.authenticate('local',{
            //if valid redirect to home
            successRedirect:'/',
            //if not redirect back to login and pass in flash errors
            failureRedirect:'/',
            failureFlash:true
        }));

    //Get logout will simply logout the user using logout();
    router.route('/logout')
        .get((req,res)=>{
            req.logout();
            res.redirect('/');
        });

    //Post route for register
    router.route('/register')
        .post((req,res,next)=>{
            var user = req.body;
            console.log(user);
            console.log(req.isAuthenticated());
            if(req.isAuthenticated() == false){
                if(user.password==user.repassword){
                    bcrypt.hash(user.password,10,(err,hash)=>{
                        db.Users.create({
                            username: user.username,
                            email: user.email,
                            password: hash,
                            age: user.age,
                            fname: user.fname,
                            lname: user.lname,
                            zip: user.zip,
                            phone: user.mphone,
                        }).then((userDataRes)=>{
                            var userId = userDataRes.dataValues.id;
                            req.login(userId,(err)=>{
                                if(err){
                                    res.json(err);
                                } else {
                                    console.log('TESSTING', userDataRes.dataValues);
                                    res.json({
                                        age: userDataRes.dataValues.age,
                                        fname: userDataRes.dataValues.fname,
                                        lname: userDataRes.dataValues.lname,
                                        email: userDataRes.dataValues.email,
                                        id: userDataRes.dataValues.id,
                                        image_url: userDataRes.dataValues.image_url,
                                        phone: userDataRes.dataValues.phone,
                                        username: userDataRes.dataValues.username,
                                        zip : userDataRes.dataValues.zip,
                                        verified_seller : userDataRes.dataValues.verified_seller_ind,
                                    }); 
                                }
                            });
                        }).catch((err)=>{
                            if(err){
                                res.json(err);
                            }
                        });
                    });  
                } else {
                    res.status(400).json({
                        message:'Your passwords do not match.'
                    });
                }
            } else {
                res.json('You are already logged in');
            }
            
            
        });

        router.route("/newlistings")
        .get((req, res) => {
                db.sequelize.query('CALL usp_GetNewListings ()')
                .then((results) => {
                    console.log(results.length);
                    if (results.length===0) {
                        res.json({});
                    }
                    else {
                        res.json(results);
                    }    
                });  
        });

        router.route("/randomlistings")
        .get((req, res) => {
                db.sequelize.query('CALL usp_GetRandomListings()')
                .then((results) => {
                    console.log(results.length);
                    if (results.length===0) {
                        res.json({});
                    }
                    else {
                        res.json(results);
                    }    
                });  
        });


        router.route("/search/:paramTerm?/:paramCategory?/:zipcode?/:distance?/:unitType?")
        .get((req,res,next) => {
               var zipcode = req.params.zipcode;
               var distance = req.params.distance;
               var unitType = req.params.unitType;
               var url=`https://www.zipcodeapi.com/rest/vu9ZFfDeXZuqDa4zrcqpliw1Hk2UqvKW0TWG8zU5ypwbzBK1Nbq9tXaaic5IIPEI/radius.json/${zipcode}/${distance}/${unitType}?minimal`;
                console.log(req.params.paramTerm);
               console.log(zipcode !== "null");
               if(zipcode != "null"){
                   request(url,(err,response,body)=>{
                       //var zipcodes = JSON.parse(body).zip_codes;
                       var zipcodes = body
                       console.log(body);
                       // console.log(zipcodes.zip_codes);
                   
                       if (req.params.paramTerm==='null') {
                           var paramTerm='';
                       }
                       else {
                           var paramTerm=req.params.paramTerm;
                       }
       
                       if (req.params.paramCategory==='null') {
                           var paramCategory='';
                       }
                       else {
                           var paramCategory=req.params.paramCategory;
                       }
       
                       if (zipcodes==='null') {
                           var paramZips='';
                       }
                       else {
                           var paramZips=zipcodes;
                       }
                       
                       console.log(paramZips);
                        db.sequelize.query('CALL usp_GetSearchResults(:paramTerm, :paramCategory, :paramZips)', 
                       // {replacements: {paramTerm, paramCategory, paramZip}})
                           {replacements: {paramTerm, paramCategory, paramZips}})
                       .then((results) => {
                           console.log(results.length);
                           if (results.length===0) {
                               res.json({});
                           }
                           else {
                               res.json(results);
                               console.log(results);
                           }  
                       })
                   });
               } else {
                   if (req.params.paramTerm==='null') {
                       var paramTerm='';
                   }
                   else {
                       var paramTerm=req.params.paramTerm;
                   }
   
                   if (req.params.paramCategory==='null') {
                       var paramCategory='';
                   }
                   else {
                       var paramCategory=req.params.paramCategory;
                   }

                   var paramZips='';
                   
                   console.log(paramZips);
                    db.sequelize.query('CALL usp_GetSearchResults(:paramTerm, :paramCategory, :paramZips)', 
                   // {replacements: {paramTerm, paramCategory, paramZip}})
                       {replacements: {paramTerm, paramCategory, paramZips}})
                   .then((results) => {
                       console.log(results.length);
                       if (results.length===0) {
                           res.json({});
                       }
                       else {
                           res.json(results);
                           console.log(results);
                       }  
                   })
                };
        });
        
        router.route("/mylistings")
        .get(auth(),(req, res, next) => {
             if (req.user) {

                var paramUserId=req.user.id;
               
                db.sequelize.query('CALL usp_GetMyListings(:paramUserId)', 
                // {replacements: {paramUserId: req.user }})
                    {replacements: {paramUserId: paramUserId}})
                .then((results) => {
                 
                    if (results.length===0) {
                        res.json({});
                    }
                    else {
                        res.json(results);
                    }    
                }); 
            }  
        });

        router.route("/myoffers")
        .get(auth(),(req, res, next) => {
            if (req.user) {
                var paramUserId=req.user.id;

                db.sequelize.query('CALL usp_GetMyOffers(:paramUserId)', 
                     {replacements: {paramUserId:paramUserId}})
                .then((results) => {
                    if (results.length===0) {
                        res.json({});
                    }
                    else {
                        res.json(results);
                    }    
                }); 
            }  
        });

        router.route("/mypurchases")
        .get(auth(),(req, res, next) => {
            if (req.user) {
                var paramUserId=req.user.id;

                db.sequelize.query('CALL usp_GetMyPurchases(:paramUserId)', 
                    {replacements: {paramUserId: paramUserId }})
                .then((results) => {
                    if (results.length===0) {
                        res.json({});
                        console.log(results);
                    }
                    else {
                        res.json(results);
                        console.log(results);
                    }    
                }); 
            }  
        });

        router.route("/item/:ItemId?")
            .get(auth(),(req, res, next) => {
       
                if (req.user) {
               
                    var paramItemId=req.params.ItemId;

                        db.sequelize.query('CALL usp_GetItem(:paramItemId)', 
                            {replacements: {paramItemId: paramItemId}})
                        .then((results) => {
                            if (results.length===0) {
                                res.json({});
                            }
                            else {
                                res.json(results);
                            }    
                        }); 
                    }  
                })
        .post(auth(),(req, res, next) => {
            console.log(req.body);
            if (req.user) {
                var paramUserId= req.user.id;
                var paramTitle=req.body.title;
                var paramDesc=req.body.description;
                var paramCategory = req.body.category;
                var paramImageUrl =req.body.imgurl;
                var paramQuantity= req.body.quantity;
                var paramPrice= req.body.price;
                var paramUnitType= req.body.unittype;
                var paramBarterInd= false;
                
                db.sequelize.query('CALL usp_PostItem(:paramUserId, :paramTitle, :paramDesc, :paramCategory, :paramImageUrl, :paramQuantity, :paramPrice, :paramUnitType,:paramBarterInd)', 
                     {replacements: {paramUserId:paramUserId, paramTitle: paramTitle, paramDesc: paramDesc, paramCategory: paramCategory, paramImageUrl: paramImageUrl, paramQuantity: paramQuantity, paramPrice: paramPrice, paramUnitType: paramUnitType,paramBarterInd:paramBarterInd,}})
                .then((results) => {
                    console.log(results);
                    res.json({"success":""});
                }).catch((err)=>{
                    console.log(err);
                    return err;
                }) 
            }  
        })
        .put(auth(),(req, res, next) => {
           if (req.user) {
                var paramItemId= req.body.ItemId;
                var paramTitle= req.body.title;
                var paramDesc= req.body.description;
                var paramCategory= req.body.category;
                var paramImageUrl= req.body.item_image_url;
                var paramQuantity= req.body.quantity;
                var paramPrice= req.body.price;
                var paramUnitType= req.body.unit_type;
                var paramBarterInd= req.body.barter_ind;

                db.sequelize.query('CALL usp_PutEditItem(:paramItemId, :paramTitle, :paramDesc, :paramCategory, :paramImageUrl, :paramQuantity, :paramPrice, :paramUnitType,:paramBarterInd)', 
                    {replacements: {paramItemId: paramItemId, paramTitle: paramTitle, paramDesc:paramDesc, paramCategory: paramCategory, paramImageUrl: paramItemUrl, paramQuantity:paramQuantity, paramPrice: paramPrice, paramUnitType: paramUnitType,paramBarterInd: paramBarterInd,}})
                .then((results) => {
                    console.log(results);
                    res.json({"success":""});
                }).catch((err)=>{
                    console.log(err);
                    return err;
                })          
            }
        })
        .delete(auth(),(req, res, next) => {
       
             if (req.user) { 
                var paramItemId=req.params.ItemId;
                    
                db.sequelize.query('CALL usp_DeleteItem(:paramItemId)', 
                    {replacements: {paramItemId: paramItemId}})
                .then((results) => {
                    console.log(results);
                    res.json({"success":""});
                }).catch((err)=>{
                    console.log(err);
                    return err;
                })       
            }
        });

        router.route("/itemoffers/:ItemId")
        .get(auth(),(req, res, next) => {
   
            if (req.user) {
           
                var paramUserId=req.user.id
                var paramItemId=req.params.ItemId;

                    db.sequelize.query('CALL usp_GetItemOffers(:paramUserId, :paramItemId)', 
                        {replacements: {paramUserId: paramUserId, paramItemId: paramItemId}})
                    .then((results) => {
                        if (results.length===0) {
                            res.json({});
                        }
                        else {
                            res.json(results);
                        }    
                    }); 
                }  
            });

        router.route("/offer/:OfferId?")
        .get(auth(),(req, res, next) => {
            if (req.user) {
                var paramItemId=req.params.OfferId;

                db.sequelize.query('CALL usp_GetOffer(:paramOfferId)', 
                    {replacements: {paramOfferId: paramOfferId}})
                .then((results) => {
                    if (results.length===0) {
                        res.json({});
                    }
                    else {
                        res.json(results);
                    }    
                }); 
            }  
        })
        .post(auth(),(req, res, next) => {
            if (req.user) {
                var paramUserId=req.user.id;
                var paramItemId=req.body.ItemId; 
                var paramOfferAmt =req.body.offer_amt;
                var paramBarterItemId=null;
                console.log(paramUserId,paramItemId,paramOfferAmt);
                db.sequelize.query('CALL usp_PostOffer(:paramUserId, :paramItemId, :paramOfferAmt, :paramBarterItemId)', 
                    {replacements: {paramUserId:paramUserId, paramItemId: paramItemId, paramOfferAmt: paramOfferAmt, paramBarterItemId:paramBarterItemId}})
                .then((results) => {
                    console.log(results);
                    res.json({"success":""});
                }).catch((err)=>{
                    console.log(err);
                    return err;
                }); 
            }  
        })
        .put(auth(),(req, res, next) => {
            if (req.user) {
                var paramOfferId=req.body.OfferId;
                var paramOfferAmt =req.body.offer_amt; 
                var paramBarterItemId=req.body.barter_ItemId;

                db.sequelize.query('CALL usp_PutEditOffer(:paramOfferId, :paramOfferAmt, :paramBarterItemId)', 
                    {replacements: {paramOfferIdId: paramOfferId, paramOfferAmt: paramOfferAmt, paramBarterItemId: paramBarterItemId}})
                .then((results) => {
                    console.log(results);
                    res.json({"success":""});
                }).catch((err)=>{
                    console.log(err);
                    return err;
                })  
            }
        })
        .delete(auth(),(req, res, next) => {
   
         if (req.user) { 
            var paramofferId=req.params.OfferId;
                
            db.sequelize.query('CALL usp_DeleteOffer(:paramOfferId)', 
                {replacements: {paramOfferId: paramOfferId}})
            .then((results) => {
                console.log(results);
                res.json({"success":""});
            }).catch((err)=>{
                console.log(err);
                return err;
            })       
        }
    });

    router.route("/acceptoffer/")
    .put(auth(),(req,res,next)=>{
        if (req.user) {
            var paramUserId=req.user.id;
            var paramOfferId=req.body.OfferId;
            
            db.sequelize.query('CALL usp_PutAcceptOffer(:paramUserId, :paramOfferId)', 
                {replacements: {paramUserId: paramUserId, paramOfferId: paramOfferId}})
            .then((results) => {
                console.log(results);
                res.json({"success":""});
            }).catch((err)=>{
                console.log(err);
                return err;
            })   
            }
        });

        router.route("/buyerconfirmsale")
        .put(auth(),(req,res,next)=>{
            if (req.user) {
                var paramItemId=req.body.ItemId;
                var paramUserId=req.user.id;

                db.sequelize.query('CALL usp_PutBuyerConfirmSale(:paramUserId, :paramItemId)', 
                    {replacements: {paramUserId: paramUserId, paramItemId: paramItemId}})
                .then((results) => {
                    console.log(results);
                    res.json({"success":""});
                }).catch((err)=>{
                    console.log(err);
                    return err;
                })     
                }
            });

        router.route("/sellerconfirmsale")
        .put(auth(),(req,res,next)=>{
            if (req.user) {
                var paramItemId=req.body.ItemId;
                var paramUserId=req.user.id;

                db.sequelize.query('CALL usp_PutSellerConfirmSale(:paramUserId, :paramItemId)', 
                    {replacements: {paramUserId: paramUserId, paramItemId: paramItemId}})
                .then((results) => {
                    console.log(results);
                    res.json({"success":""});
                }).catch((err)=>{
                    console.log(err);
                    return err;
                })    
            }
        });

        router.route("/itemmessages/:ItemId?")
        .get(auth(),(req, res, next) => {
            if (req.user) {
                var paramItemId=req.params.ItemId;

                db.sequelize.query('CALL usp_GetItemMessages(:paramItemId)', 
                    {replacements: {paramItemId: paramItemId}})
                .then((results) => {
                    if (results.length===0) {
                        res.json({});
                    }
                    else {
                        res.json(results);
                        }    
                    }); 
                }  
            });

            router.route("/inbox")
            .get(auth(),(req, res, next) => {
                if (req.user) {
                    var paramUserId=req.user.id;
    
                    db.sequelize.query('CALL usp_GetInbox(:paramUserId)', 
                        {replacements: {paramUserId: paramUserId}})
                    .then((results) => {
                        if (results.length===0) {
                            res.json([]);
                        }
                        else {
                            res.json(results);
                            }    
                        }); 
                    }  
                });

                
            router.route("/itemusermessages/:UserId/:ItemId")
            .get(auth(),(req, res, next) => {
                if (req.user) {
                    var paramLoginUserId=req.user.id;
                    var paramUserId=req.params.UserId;
                    var paramItemId=req.params.ItemId;
                    db.sequelize.query('CALL usp_GetItemUserMessages(:paramLoginUserId, :paramUserId, :paramItemId)', 
                        {replacements: {paramLoginUserId: paramLoginUserId, paramUserId: paramUserId,paramItemId: paramItemId}})
                    .then((results) => {
                        if (results.length===0) {
                            res.json([{
                                ItemId:paramItemId,
                                chat_with_UserId: paramUserId
                            }]);
                        }
                        else {
                            res.json(results);
                            }    
                        }); 
                    }  
                });

            router.route("/message/:MessageId?")
            .get(auth(),(req, res, next) => {
                if (req.user) {
                    var paramItemId=req.params.MessageId;
    
                    db.sequelize.query('CALL usp_GetMessage(:paramMessageId)', 
                        {replacements: {paramMessageId: paramMessageId}})
                    .then((results) => {
                        if (results.length===0) {
                            res.json({});
                        }
                        else {
                            res.json(results);
                            }    
                        }); 
                    }  
                })
             .post(auth(),(req,res,next)=> {
                 if (req.user) {
                     console.log(req.body);
                      var paramItemId=req.body.ItemId;
                      var paramFromId=req.user.id;
                      var paramToId=req.body.ToId;
                      var paramMessage=req.body.message_text;

                      db.sequelize.query('CALL usp_PostMessage(:paramItemId, :paramFromId, :paramToId, :paramMessage)', 
                        {replacements: {paramItemId: paramItemId,paramFromId: paramFromId, paramToId: paramToId, paramMessage: paramMessage}})
                    .then((results) => {
                        io.sockets.emit(`new_message_from_${paramFromId}_to_${paramToId}`);
                        io.sockets.emit(`new_message_to_${paramToId}`);
                        io.sockets.emit(`new_message_to_${paramFromId}`);
                        res.end();
                    }).catch((err)=>{
                      console.log(err);
                      return err;
                    });
                }
             }) 
             .put(auth(),(req,rest,next)=> {
                if (req.user) {
                     var paramMessageId=req.params.MessageId;
                     var paramMessage=req.params.message_text;

                     db.sequelize.query('CALL usp_PutEditMessage(:paramMessageId, paramMessage: paramMessage)', 
                       {replacements: {paramMessageId: paramMessageId, paramMessage: paramMessage}})
                   .then((results) => {
                     console.log(results);
                     res.json({"success":""});
                   }).catch((err)=>{
                     console.log(err);
                     return err;
                   });              
               }
            }) 
            .delete(auth(),(req,rest,next)=> {
                if (req.user) {
                     var paramItemId=req.params.MessageId;

                   db.sequelize.query('CALL usp_DeleteMessage(:paramMessageId)', 
                       {replacements: {paramMessageId: paramMessageId,}})
                   .then((results) => {
                     console.log(results);
                     res.json({"success":""});
                   }).catch((err)=>{
                     console.log(err);
                     return err;
                   })  
                 }
                });   
            
            router.route("/messageread/:MessageId?")
            .put(auth(),(req, res, next) => {
                if (req.user) {
                    var paramMessageId=req.params.MessageId;
        
                    db.sequelize.query('CALL usp_PutMessageRead(:paramMessageId)', 
                        {replacements: {paramMessageId: paramMessageId}})
                    .then((results) => {
                        console.log(results);
                        res.json({"success":""});
                    }).catch((err)=>{
                        console.log(err);
                        return err;
                    })       
                }
            });

            router.route("/user")
            .get(auth(),(req, res, next) => {
                if (req.user) {
                    var paramUserId=req.user.id;
    
                    db.sequelize.query('CALL usp_GetUser(:paramUserId)', 
                        {replacements: {paramUserId: paramUserId}})
                    .then((results) => {
                        if (results.length===0) {
                            res.json({});
                        }
                        else {
                            res.json(results);
                            }    
                        }); 
                    }  
                })
            .put(auth(),(req, res, next) => {
                if (req.user) {
                    console.log(req.body);
                    var paramUserId=req.user.id;
                    var paramEmail=req.body.email;
                    var paramAge=req.body.age; 
                    var paramFname=req.body.fname; 
                    var paramLname=req.body.lname; 
                    var paramZip=req.body.zip; 
                    var paramPhone=req.body.phone;
                    var paramImageUrl=req.body.imgurl;
                    db.sequelize.query('CALL usp_PutEditUser(:paramUserId, :paramEmail, :paramAge, :paramFname, :paramLname, :paramZip, :paramPhone, :paramImageUrl)', 
                        {replacements: {paramUserId: paramUserId, paramEmail: paramEmail, paramAge: paramAge, paramFname: paramFname, paramLname: paramLname, paramZip: paramZip, paramPhone: paramPhone, paramImageUrl: paramImageUrl}})
                    .then((results) => {
                        console.log(results);
                        res.json({results});
                    }).catch((err)=>{
                      console.log(err);
                      return err;

                    });      
                  }
            })
            .delete(auth(),(req,res,next)=> {
                if(req.user) {
                    var paramUserId=req.user.paramFromId;
                    
                    db.sequelize.query('CALL usp_DeleteUser(:paramUserId)', 
                        {replacements: {paramUserId: paramUserId}})
                    .then((results) => {
                        console.log(results);
                        res.json({"success":""});
                    }).catch((err)=>{
                        console.log(err);
                        return err;
                    })      
                }
            });

            router.route("/rateseller")
            .put(auth(),(req,res,next) =>{
                if (req.user) {
                    var paramItemId=req.body.ItemId;
                    var paramRating=req.body.rank;
                    var paramUserId=req.user.id

                    db.sequelize.query('CALL usp_PutEditSellerRating(:paramItemId, :paramRating, :paramUserId)', 
                        {replacements: {paramItemId: paramItemId, paramRating: paramRating, paramUserId: paramUserId}})
                    .then((results) => {
                        console.log(results);
                        res.json({"success":""});
                    }).catch((err)=>{
                      console.log(err);
                      return err;
                    })     
                }
            });

            router.route("/verifyuser/:code?")
            .put(auth(),(req,res,next) =>{
                if (req.user) {
                    var paramUserId=req.user.id;
                    var paramCode=req.params.code;
    
                    db.sequelize.query('CALL usp_PutVerifyUser(:paramUserId, :paramCode)', 
                        {replacements: {paramUserId: paramUserId, paramCode: paramCode}})
                    .then((results) => {
                        res.json(results[0]);
                    }).catch((err)=>{
                      console.log(err);
                      return err;
                    });                      
                }
            });

            router.route("/verificationcode")
            .put(auth(),(req,res,next) =>{
                    var paramUserId=req.user.id;
    
                    db.sequelize.query('CALL usp_PutUserVerificationCode(:paramUserId)', 
                        {replacements: {paramUserId: paramUserId}})
                    .then((results) => {
                        var vcode = results[0].verification_code;
                        var uphone = req.user.phone;
                        console.log(vcode, uphone)
                        SMS.messages.create({
                            body:`Your verification code is : ${vcode}`,
                            to:`+1${uphone}`,
                            from:'+19493269107'
                        }, (err,sms)=>{
                            if (err) throw err;
                            console.log(sms);
                            res.json({results});
                        });
                        
                    }).catch((err)=>{
                      console.log(err);
                      return err;
                    })   
            });

            router.route("/resetpassword")
            .put((req,res,next) =>{
       
                    var paramEmail=req.body.email;
                    var paramPassword=req.body.password;
    
                    db.sequelize.query('CALL usp_PutResetPassword(:paramEmail, :paramPassword)', 
                        {replacements: {paramEmail: paramEmail, paramPassword: paramPassword}})
                    .then((results) => {
                        console.log(results[0]);
                        res.json(results[0]);
                    }).catch((err)=>{
                      console.log(err);
                      return err;
                    });   
            });
            
            router.route("/changepassword")
            .put(auth(),(req,res,next) =>{
                if (req.user) {
                    var paramUserId=req.user.id;
                    var paramPassword=req.body.password;
                    
                    db.sequelize.query('CALL usp_PutChangePassword(:paramUserId, :paramPassword)', 
                        {replacements: {paramUserId: paramUserId, paramPassword: paramPassword}})
                    .then((results) => {
                        console.log(results[0]);
                        res.json(results[0]);
                    }).catch((err)=>{
                      console.log(err);
                      return err;
                    });   
                }   
            });

        // call usp_GetMostRecent();
        // call usp_GetRandom();
        // call usp_GetMyListings(1);
        // call usp_GetMyPurchases(1);
        // call usp_GetMyOffers(1);
        // call usp_GetSearchResults('iphone',null,null);
        // call usp_GetItem(1);
        // call usp_PostItem(1, 'couch','10ft leather couch good condition','furniture',null,1,350,'flat per item',0);
        // call getOffer(1);
        // call usp_PostOffer(1, 1,300,null);
        // call usp_PutOffer(1,300,null);
        // call usp_PutAcceptOffer(1);
        // call usp_PutEditItem(1, 'couch','10ft leather couch good condition','furniture',null,1,350,'flat per item',0);
        // call usp_PutBuyerConfirmSale(1);
        // call usp_PutSellerConfirmSale(1);
        // call usp_PutEditOffer(1, 1,325,null);
        // call usp_PutEditSellerRating(1,3);
        // call usp_PutEditUser(1,19,90803,123-456-7890,);
        // call usp_PutVerifyUser(1,12345);
        // call usp_PostMessage(1,1,2,'test');
        // call usp_PutMessageRead(1);
        // call usp_GetInbox(1);
        // call usp_GetMessage;
        // call usp_GetItemMessages;
        // call usp_DeleteMessage(1);
        // call usp_DeleteOffer(1);
        // call usp_DeleteItem(1);
        // call usp_DeleteUser(999);
        
        // router.route('/password-reset')
        // .post((req, res) => {
        //     // Password reset route
        //         // Send users an email with a link to a page where they can reset their passwords
        //         var tempPassword = 'alsdf23450fv848';

        //         var transporter = nodemailer.createTransport({
        //             host: 'smtp.gmail.com',
        //             port: 465,
        //             secure: true, // secure:true for port 465, secure:false for port 587
        //             auth: {
        //                 user: 'chuckit.help@gmail.com',
        //                 pass: 'B00tchuck!t'
        //             }
        //         });
            
        //         db.Users.update({
        //             password: tempPassword
        //         },
        //     {
        //         where: {
        //             email: req.body.email
        //         }
        //     }).then((results) => {
        //         var ownerEmail = req.body.email;
            
        //         let mailOptions = {
        //             from: '"Chuck-It!" <chuck-it@gmail.com>', // sender address
        //             to: ownerEmail, // list of receivers
        //             subject: `Password Recovery`, // Subject line
        //             text: `Hi,\n
        //             Your temporary recovery password is: ${tempPassword}.\n
        //             Please be sure to enter a new password after logging in.`, // plain text body
        //         };
            
        //         // send mail with defined transport object
        //         transporter.sendMail(mailOptions, (error, info) => {
        //             if (error) {
        //                 return console.log(error);
        //             }
        //             console.log(`Message ${info.messageId} sent: ${info.response}`);
        //         });
        //     });
        // });
    
    
    return router;
};