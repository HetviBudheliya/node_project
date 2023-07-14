const passport = require('passport');
const crud = require('../models/creatSchema');

const profile = (req,res) =>{
    return res.render('admin/profile');
}

const changeProfile = async (req,res) =>{
    try{
        const{editid,name,password,cpassword} = req.body
        if(!name || !password || !cpassword){
            console.log("Enter all fild");
            return res.redirect('back');
        }
        if(password != cpassword){
            console.log("Password are not match");
            return res.redirect('back');
        }
        let changeProfile = await crud.findByIdAndUpdate(editid,{
            name :  name,
            password : password
        })
        if(changeProfile){
            console.log("Profile is changed");
            return res.redirect('back');
        }
    }catch (err) {
        if (err) {
            console.log(err);
            return false
        }
    }
}

module.exports = {
    profile,
    changeProfile
}