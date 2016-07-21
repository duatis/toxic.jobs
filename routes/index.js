var express = require('express'),
    router = express(),
    path = require('path'),
    company    = new (require('../controllers/companyController'))();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(('./public/index.html'));
});

module.exports = router;
