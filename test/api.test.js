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

describe("API", function()
{
    var company_id,
        company_URID,
        comment_text = faker.lorem.paragraph(),
        cookies;

    before((done)=>{
        request.post('/account').
        send({username: "test", password: "test"}).
        end((err,res)=>{
            request.post('/account/login').
            send({username: "test", password: "test"}).end((err,res) => {
                if (err)return console.error(err.response.body);
                cookies = res.headers['set-cookie'].pop().split(';')[0];
                createCompany();
            });
        });

        var createCompany = ()=> {
            req = request.post('/api/company');
            req.cookies = cookies; //set cookies saved before
            req.send({
                name: "company for comments",
                description: test_description
            }).end((err, res)=> {
                company_id = res.body._id;
                company_URID = res.body.URID;

                var req = request.post('/api/company/' + res.body.URID + '/comment');
                req.cookies = cookies;
                req.send({text: comment_text}).
                end((err, data) => {
                    if (err != null)console.log(err);
                    var req = request.post('/api/company/' + res.body.URID + '/comment');
                    req.cookies = cookies;
                    req.send({text: comment_text}).end((err, data) => {
                        if (err != null)console.log(err);
                        done();
                    });

                });

            });
        }
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
        var req = request.post('/api/company');
        req.cookies = cookies;
        req.
        send({name: faker.name.findName(), description: test_description}).
        end((err, res)=>{
            expect(res).to.be.json;
            done();
        });
    });

    it("post /company shouldn't save if company has errors", (done) =>{
        var req = request.post('/api/company');
        req.cookies = cookies;
        req.
        send({name: "company from post", description: test_description, email: "duatis-gmail.com"}).
        end((err, res)=>{
            expect(res).to.have.status(500);
            done();
        });
    });


    it("Unregistered user should not be alowed to save company", (done) =>{
        request.get('/account/logout').end( (err,res) => {
            var req = request.post('/api/company');
            req.cookies = null;
            req.send({name: faker.name.findName(), description: test_description}).end((err, res)=> {
                expect(res).to.have.status(401);
                done();
            });
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

        var req = request.post('/api/company/' + company_URID + '/comment');
        req.cookies = cookies;
        req.send(_comment).
        end((err, res) =>{
            request.get('/api/company/' + company_URID + '/comments').
            end((err,res)=>{
                expect(res.body.length).equal(3);
                done();
            });
        });
    });

    after((done)=>{
        request.del("/account/test").end((err,res) => {
            if(err)console.error(err);
            done();
        });
    });


    it("should respond to get /questions", (done)=>{
        request.get('/api/questions').
        end((err,res)=>{
            expect(res).to.not.have.status(404);
            done();
        });
    } );


    it("/questions return list of questions", (done) =>{
        request.get('/api/questions').
        end((err,res)=>{
            expect(res.body).to.be.array;
            expect(res.body[0].text).to.contain('Question');
            done();
        });
    });

    it("should respond to post  /company/:URID/scores", (done)=>{
        request.post('/api/company/'+company_URID+'/scores').
        end((err,res)=>{
            expect(res).to.not.have.status(404);
            done();
        });
    } );

    it("post /company/:URID/scores saves scores to question for company");

});