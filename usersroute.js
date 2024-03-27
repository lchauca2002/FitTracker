const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');


router.get('/SignupPG', (req, res) => {
    res.render('users/SignupPG');
})
router.post('/SignupPG', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome!!!');
            res.redirect('/');
        })
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/SignupPG');
    }

}))
router.get('/LoginPG', (req, res) => {
    res.render('users/LoginPG');
})
router.post('/LoginPG', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/LoginPG' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/';
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
});

module.exports = router;
