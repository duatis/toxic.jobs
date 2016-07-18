/**
 * Created by duatis on 15/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var Comment = require('../models/comment.js');
var Company = require('../models/company.js');

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
                            Comment.findOne(data).populate("_company").exec(
                                function(err, data)
                                {
                                    expect(data._company._id.toString()).to.equal(company._id.toString());
                                    done();
                                }
                            );

                        }
                    );
            }
        );
    });

    it('comments should have -1 register after a remove', function(done) {
        Comment.find({}).exec(
            function(err, results1)
            {
                var n = results1.length;
                Comment.remove({_id: results1[0]._id},
                    function(err)
                    {
                        Comment.find({}).exec(
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