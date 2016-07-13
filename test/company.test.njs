/**
 * Created by duatis on 13/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var db = 'mongodb://localhost/toxic_jobs_test';
var mongoose = require('mongoose').connect(db);
var Company  = require('../models/company.njs')(mongoose);

describe('Company model test', function() {
    it('save company should add new document to database', function(done) {
        var _company = new Company({name: "company test", description: "Test company for unit tests"}).save(
            function(err, result)
            {
                expect(result.name).to.equals("company test");
                done();
            }
        );
    });


    it('companies should have +1 register after a save', function(done) {
        Company.find({}).exec(
            function(err, results1)
            {
                var n = results1.length;
                var _company = new Company({}).save(
                    function(err, result)
                    {
                        Company.find({}).exec(
                            function(err, results2)
                            {
                                expect(results2.length).to.equal(n+1);
                                done();
                            }
                        );
                    }
                );
            }
        );

    });

    it('companies should have -1 register after a remove', function(done) {
        Company.find({}).exec(
            function(err, results1)
            {
                var n = results1.length;
                Company.remove({_id: results1[0]._id},
                    function(err)
                    {
                        Company.find({}).exec(
                            function(err, results2)
                            {
                                expect(results2.length).to.equal(n-1);
                                done();
                            }
                        );
                    }
                );
            }
        );

    });

});