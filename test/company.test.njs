/**
 * Created by duatis on 13/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var Company  = new (require('../models/company.njs'))();

describe('Company model', function() {
    it('save company should add new document to database', function(done) {
        var _company = new Company({name: "company new struct", description: "Test company for unit tests"}).save(
            function(err, result)
            {
                expect(result.name).to.equals("company new struct");
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