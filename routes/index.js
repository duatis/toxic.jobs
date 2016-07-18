var express = require('express'),
    router = express(),
    company    = new (require('../models/company.js'))();

/* GET home page. */
router.get('/', function(req, res, next) {
  company.find({}).exec(function(err,data){
    res.send(data);
  });
});

module.exports = router;
