const express = require('express');

const routes = express.Router();

const passport = require('passport');

const fileupload = require('../config/fileupload');

const passportController = require('../controller/passportController');
const blogController = require('../controller/blogController');
const profileController = require('../controller/profileController');
const fpassController = require('../controller/fpassController');
const categoryController = require('../controller/CategoryController');
const subCatController = require('../controller/subCatController');
const exsubController = require('../controller/exsubController');
const productController = require('../controller/productController');

// login routing
routes.get('/',passportController.login);
routes.get('/register',passportController.register);
routes.get('/index',passport.checkAuthentication,passportController.index);
routes.post('/registerData',passportController.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),passportController.loginData);
routes.get('/logOut',passportController.logOut);

// forgot password routing
routes.get('/ForgotPassword',fpassController.ForgotPassword);
routes.post('/forgotemail',fpassController.forgotemail);
routes.get('/OTP',fpassController.OTP);
routes.post('/sendOTP',fpassController.sendOTP);
routes.get('/newpass',fpassController.newpass);
routes.post('/newpassPort',fpassController.newpassPort);

// blog routing
routes.get('/addBlog',blogController.addBlog);
routes.post('/insertBlogData',fileupload,blogController.insertBlogData);
routes.get('/viewBlogData', passport.checkAuthentication,blogController.viewBlogData);
routes.get('/deleteBlogData',blogController.deleteBlogData);
routes.get('/editBlogData',blogController.editBlogData);

// profile
routes.get('/profile',profileController.profile);
routes.post('/changeProfile',profileController.changeProfile);

// Category
routes.get('/category',categoryController.category);
routes.post('/categoryData',categoryController.categoryData);
routes.get('/deletecategory',categoryController.deletecategory);
routes.get('/subCategory',subCatController.subcategory); 
routes.post('/subcatAdd',subCatController.subcatAdd);
routes.get('/exsubcategory',exsubController.exsubcategory);
routes.post('/exsubcatAdd',exsubController.exsubcatAdd);

// product
routes.get('/product',productController.product);
routes.post('/addproduct',productController.addproduct);
routes.get('/poductview',productController.poductview);

module.exports = routes;