'use strict';

module.exports = (express,passport,db,bcrypt,path)=>{
    
    // Sets up the Express Router
    const router = express.Router();
    const auth = require('./../config/passport/passport.js')(passport,db);

    router.route('/')
        .get((req,res,next)=>{
            res.sendFile(path.join(__dirname,'../public/index.html'));
        });
    
    router.route('/login')
        .get((req,res,next)=>{
            res.send('done');
        });

    return router;
};