/**
 * Created by duatis on 18/07/16.
 */
var express = require('express'),
    router = express(),
    company    = new (require('../controllers/companyController.js'));
    comment    = new (require('../controllers/commentController.js'));

router.get('/companies', function(req, res) {
    company.find().exec(function(err,data){
        res.json(data);
    });
});

router.get('/company/:URID', function(req, res) {
    company.findOne({URID: req.params.URID},(err,data) =>{
        if(err != null) res.status(500).end(err);
        res.json(data);
    });
});

router.get('/company/:URID/comments', function(req, res) {
    company.findOne({URID: req.params.URID}, (err,data) =>{
        if(err != null) res.status(500).end(err);
        else{
            comment.find({_company: data._id}).
                exec((err,data)=>{
                if(err != null )res.status(500).end(err);
                res.json(data);
            });
        }

    });
});


router.post('/company', function(req, res) {
    company.create(req.body, (err, data)=>{
        if(err != null) res.status(500).send(err);
        else
            res.json(data);
    } );
});

router.post('/company/:URID/comment', function(req, res) {
    company.findOne({URID: req.params.URID}, (err,data) =>{
        if(err != null) res.status(500).send(err);
        else {
            req.body._company = data._id;
            comment.create(req.body, (err, data)=>{
                if(err != null) res.status(500).send(err);
                else
                    res.json(data);
            } );
        }
    } );
});





module.exports = router;
