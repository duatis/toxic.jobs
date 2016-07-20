/**
 * Created by duatis on 18/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app');
var request = chai.request(app);
var faker = require('faker')
var test_description = faker.lorem.paragraph();

describe("API", function(){

    var company_id,
        company_URID,
        comment_text = faker.lorem.paragraph();

    before((done)=>{

        request.post('/api/company').
        send({name: "company for comments", description: test_description}).
        end((err, res)=>{
            company_id =  res.body._id;
            company_URID =  res.body.URID;

            request.post('/api/company/' + res.body.URID + '/comment').
            send({text: comment_text, _company: company_id}).
            end((err,data) =>{
                if(err != null)console.log(err);
                request.post('/api/company/' + res.body.URID + '/comment').
                send({text: comment_text, _company: company_id}).
                end((err,data) =>{
                    if(err != null)console.log(err);
                    done();
                });

            });

        });

    });

    it("should respond to get /companies", (done)=>{
        request.get('/api/companies').
        end((err,res)=>{
            expect(res).to.not.have.status(404);
            done();
        });
    } );

    it("should respond to get /commpany/:URID/comments", (done)=>{
        request.get('/api/company/' + company_URID + '/comments').
        end((err,res)=>{
            expect(res).to.not.have.status(404);
            done();
        });
    } );

    it("should respond to get /company/:URID", (done)=>{
        request.get('/api/company/test').
        end((err,res)=>{
            expect(res).to.not.have.status(404);
            done();
        });
    } );

    it("should respond to post /company", (done)=>{
        request.post('/api/company').
        end((err,res)=>{
            expect(res).to.not.have.status(404);
            done();
        });
    } );

    it("post /company should save new company", (done) =>{
        request.post('/api/company').
            send({name: "company from post", description: test_description}).
            end((err, res)=>{
                expect(res).to.be.json;
                done();
        });
    });

    it("post /company shouldn't save if company has errors", (done) =>{
        request.post('/api/company').
        send({name: "company from post", description: test_description, email: "duatis-gmail.com"}).
        end((err, res)=>{
            expect(res).to.have.status(500);
            done();
        });
    });

    it("get /commpany/:URID/comments should return comments from company", (done)=>{
        request.get('/api/company/' + company_URID + '/comments').
        end((err,res)=>{
            expect(res.body.length).equal(2);
            expect(res.body[0]._company).equal(company_id);
            expect(res.body[0].text).equal(comment_text.toString());
            done();
        });
    } );
});
