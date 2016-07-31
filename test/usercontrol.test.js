var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app');
var request = chai.request(app);
var faker = require('faker')
var test_description = faker.lorem.paragraph();
var Account = require('../models/account.js');
var faker = require('faker');
var username = faker.name.findName();
var password = faker.internet.password();

describe("Autentication API", function()
{
    var cookies;

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

    it("/loggedin should return false if user is not authenticated", (done) =>{
        var req = request.get('/account/loggedin');
        req.cookies = cookies;
        req.end((err, res) =>{
            expect(res.body.result).not.to.be.ok;
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
            cookies = res.headers['set-cookie'].pop().split(';')[0]; //save the cookie for further tests
            done();
        });
    } );

    it("/loggedin should return true if user is authenticated", (done) =>{
        var req = request.get('/account/loggedin');
        req.cookies = cookies; //set cookies saved before
        req.end((err, res) =>{
            expect(res.body.result).to.be.ok;
            done();
        });
    } );
});