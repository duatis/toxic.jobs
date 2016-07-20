/**
 * Created by duatis on 15/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var Comment = require('../models/comment.js');
var Company = require('../models/company.js');
var faker = require('faker');

describe('Comment model', function() {


    before(function() {

        Comment.remove({});
        Company.remove({}, ()=> {
            new Company({
                name: "company for comment test",
                description: "a simple company to perform comment test"
            }).save();
        });
    });

    it('save comment should add new document to database', function(done) {
        var fake_text = faker.lorem.paragraph();
        new Comment({text:fake_text }).save(
            function(err, data)
            {
                expect(data.text).to.equals(fake_text);
                done();
            }
        );
    });

    it('company of the comment should be related', function(done) {
        Company.findOne().exec(
            function(err, data)
            {
                var company = data;
                var fake_name = faker.name.findName();
                new Comment({text: fake_name, _company: company._id })
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
                        if(err != null) expect(true).to.be.false;
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