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
            send({text: comment_text}).
            end((err,data) =>{
                if(err != null)console.log(err);
                request.post('/api/company/' + res.body.URID + '/comment').
                send({text: comment_text}).
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

    it("post /commpany/:URID/comments should save new comment for the company", (done) =>{
        var _comment = {text: faker.lorem.paragraph()};
        request.post('/api/company/' + company_URID + '/comment').
        send(_comment).
        end((err, res) =>{
            request.get('/api/company/' + company_URID + '/comments').
            end((err,res)=>{
                expect(res.body.length).equal(3);
                done();
            });
        });
    });
});


var Account = require('../models/account.js');
var faker = require('faker');

var username = faker.name.findName();
var password = faker.internet.password();


describe("Autentication API", function(){
    before((done) =>{
        var account = new Account({
            username: username
        });

        Account.register(account,password,function(error, account) {
            if (error) console.log('error' + error.message);
            else console.log('no error');
            done();
        });
    });

    it("respond to post /login", (done)=>{
        request.post('/account/login').
        end((err,res)=>{
            expect(res).to.not.have.status(404);
            done();
        });
    } );

    it("respond to post /", (done)=>{
        request.post('/account').
        send({username: faker.name.findName(), password: password}).
        end((err,res)=>{
            expect(res).to.not.have.status(500);
            done();
        });
    } );


    it("don't allow duplicate username", (done)=>{
        request.post('/account').
        send({username: username, password: password}).
        end((err,res)=>{
            expect(res).to.have.status(500);
            done();
        });
    } );



    it("wrong login should return 401 status", (done)=>{
        request.post('/account/login').
        send({username: username, password: "wrong pass"}).
        end((err,res)=>{
            expect(res).to.have.status(401);
            done();
        });
    } );


    it("correct login should return logged user", (done)=>{
        request.post('/account/login').
        send({username: username, password: password}).
        end((err,res)=>{
            expect(res).to.not.have.status(401);
            expect(res).to.be.json;
            expect(res.body.username).to.equal(username);
            done();
        });
    } );

    it("return true if user is logged in", (done) =>{
            request.get('/account/loggedin').
            end((err,res) =>{
                console.log(res.body.result);
                expect(res.body.result).to.be.ok;
                done();
            });
        });

});
