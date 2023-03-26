const express = require('express');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const router = express.Router();
// const User = require('../models/user');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))


router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

//For newer version of passport @0.6.0
// router.get('/logout', (req, res, next) => {

//     req.logout(function (err) {
//         if (err) { return next(err); }
//         req.flash('success', "Successfully logged out!"); 
//         res.redirect('/campgrounds');
//     });
// });

router.get('/logout', users.logout)

module.exports = router;