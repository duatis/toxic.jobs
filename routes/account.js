/**
 * Created by duatis on 24/07/16.
 */
var express = require('express'),
    router = express();
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());
//config passport
var Account = require('../models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.post('/login',  passport.authenticate('local'),
    (req, res)=> {
        res.json(req.user);
    });

module.exports = router;