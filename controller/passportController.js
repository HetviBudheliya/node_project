const crud = require('../models/creatSchema');

const login = (req, res) => {
    if(res.locals.user){
        return res.render('admin/index');
    }
    return res.render('admin/signin');
}

const register = (req, res) => {
    return res.render('admin/signup');
}
const index = (req, res) => {
    return res.render('admin/index');
}

// register data start
const registerData = async(req,res) =>{
    try{
        console.log(req.body);
        const {name , email , password , cpassword} = req.body
        if(password == cpassword){
            const userData = await crud.create({
                name : name,
                email : email,
                password : password
            })
            if(userData){
                console.log("User Successfully Register");
                return res.redirect('/');
            }else{
                console.log("user can't Register");
                return res.redirect('back');
            }
        }
        else{
            console.log("Please Enter Same Password");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
// register data end

// login data start
const loginData = (req,res) =>{
    return res.redirect('/index');
}
// login data end

// logout data start
const logOut = (req,res) =>{
    req.logOut((err) =>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}
// logout data end

module.exports = {
    login,
    register,
    index,
    registerData,
    loginData,
    logOut,
}