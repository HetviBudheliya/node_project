const express = require('express');

const routes = express.Router();    

const passport = require('passport');

const fileupload = require('../config/fileupload');

const passportController = require('../controller/passportController');
const blogController = require('../controller/blogController');
const profileController = require('../controller/profileController');

// login routing
routes.get('/',passportController.login);
routes.get('/register',passportController.register);
routes.get('/index',passport.checkAuthentication,passportController.index);
routes.post('/registerData',passportController.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),passportController.loginData);
routes.get('/logOut',passportController.logOut);

// blog routing
routes.get('/addBlog',blogController.addBlog);
routes.post('/insertBlogData',fileupload,blogController.insertBlogData);
routes.get('/viewBlogData', passport.checkAuthentication,blogController.viewBlogData);
routes.get('/deleteBlogData',blogController.deleteBlogData);
routes.get('/editBlogData',blogController.editBlogData);

// profile
routes.get('/profile',profileController.profile);
routes.post('/changeProfile',profileController.changeProfile);

routes.get('/table',passportController.table);
routes.get('/button',passportController.button);
routes.get('/chart',passportController.chart);
routes.get('/element',passportController.element);
routes.get('/form',passportController.form);
routes.get('/widget',passportController.widget);
routes.get('/err',passportController.err);
routes.get('/typography',passportController.typography);


module.exports = routes