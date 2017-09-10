'use strict';

module.exports = (passport,db)=>{
//Serialize the user if by id if avialble 
    passport.serializeUser((id, done) => {
        done(null, id);
    });
//Deserialize the user if id is found in cookie and is valid
    passport.deserializeUser(function(id, done) {
        db.Users.findById(id).then(function(user) {
                done(null,{
                    id:user.dataValues.id,
                    username: user.dataValues.username,
                    email: user.dataValues.email,
                    age: user.dataValues.age,
                    fname: user.dataValues.fname,
                    lname: user.dataValues.lname,
                    zip: user.dataValues.zip,
                    phone : user.dataValues.phone,
                    fname : user.dataValues.fname,
                    lname : user.dataValues.lname,
                    image_url: user.dataValues.user_image_url,
                    verification_code : user.dataValues.verification_code,
                    verified_seller : user.dataValues.verified_seller_ind
                });
            }).catch(function(err) {
                if (err) {
                    throw err;
            }
        });
    });

//Middleware authentication function that verifies the user login
//helps prevent access to certain page
    function authenticationMiddleware () {  
        return (req, res, next) => {
            if (req.isAuthenticated()) return next();
            res.redirect('/login')
        }
    };
    
//Return the authentication function for use
    return authenticationMiddleware;
};