const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const User = require('../models/creatSchema');

// find data with email
passport.use(new passportLocal({
    usernameField : 'email',
},async(email,password,done) =>{
    try{
        let user = await User.findOne({email : email});
        if(!user || user.password  != password){
            console.log("Email & Password isn't valid");
            return done(null,false);
        }
        return done(null,user);
    }catch(err){
        return done(null,false);
    }
}));

//  find data with id
passport.serializeUser((user,done)=>{
    return done(null,user.id)
});


passport.deserializeUser(async(id,done)=>{
    try{
        let user = await User.findById(id);
        if(user){
            return done(null,user);
        }else{  
            return done(null,false);
        }
    }catch(err){
        return done(null,false);
    }
})

// login watchman

passport.checkAuthentication = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}
// login watchman end

// login hoy to dashboard na page ma jay & na hoy to na jay 
passport.setAuthentication = (req,res,next) =>{
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    return next();
}

module.exports = passport;