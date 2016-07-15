/**
 * Created by duatis on 15/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var Comment = require('../models/comment.njs');
var Company = require('../models/company.njs');

describe('Comment model', function() {
    it('save comment should add new document to database', function(done) {
        new Comment({text: "dummy text"}).save(
            function(err, data)
            {
                expect(data.text).to.equals("dummy text");
                done();
            }
        );
    });

    it('company of the comment should be related', function(done) {
        Company.findOne().exec(
            function(err, data)
            {
                var company = data;
                new Comment({text: company.name + " comment ", _company: company._id })
                    .save(
                        function(err, data)
                        {
                            var _comment = data;
                            expect(false).to.equal(true);
                            done();
                        }
                    );
            }
        );
    });

});