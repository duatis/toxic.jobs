/**
 * Created by duatis on 24/07/16.
 */
var express = require('express'),
    router = express(),
    passport = require('passport'),
    Account = require('../models/account');

router.delete('/:username', (req,res) =>{
    Account.remove({username:req.params.username},(err,data)=>{
        if(err)return res.status(500).send(err);
        res.json(data);
    })
})

router.post('/login',  passport.authenticate('local'),
    (req, res)=> {
        req.session.save((err)=>{
            if(err)return res.status(500).send(err);
            res.json( req.user )
        });
    });
router.get('/logout', function(req, res){
    req.logout();
    req.session.save((err)=> {
        res.end();
    });
});

router.post('/',
    (req, res)=> {
        Account.register({username:req.body.username}, req.body.password, (err, response) =>{
            if(err)return res.status(500).send(err);
            res.json(response);
        });
    });

router.get('/loggedin', isLoggedIn, (req, res) =>{
        res.json({result: true});
    });


function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.json({result: false});
}

module.exports = router;