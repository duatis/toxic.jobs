/**
 * Created by duatis on 18/07/16.
 */
var express = require('express'),
    router = express(),
    company    = new (require('../controllers/companyController.njs'));

/* GET home page. */
router.get('/companies', function(req, res, next) {
    company.find().exec(function(err,data){
        res.json(data);
    });
});

router.get('/company/:URID', function(req, res, next) {
    company.find({URID: req.params.URID}).
    exec((err,data) =>{
        res.json(data);
    });
});

module.exports = router;
