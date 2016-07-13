/**
 * Created by duatis on 13/07/16.
 */
var db = 'mongodb://localhost/toxic_jobs';
var mongoose = require('mongoose').connect(db);
var company  = require('./models/company.njs');
var companyController = require('./controllers/companyController.njs')(company(mongoose));

companyController.index(function(error, companies){
    console.log(companies);
});