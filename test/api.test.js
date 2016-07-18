/**
 * Created by duatis on 18/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app');
var request = chai.request(app);

describe("API", function(){
    it("should respond to /companies", (done)=>{
        request.get('/api/companies').
        end((err,res)=>{
            expect(res).to.have.status(200);
            done();
        });
    } );
    it("should respond to /company/:URID", (done)=>{
        request.get('/api/company/test').
        end((err,res)=>{
            expect(res).to.have.status(200);
            done();
        });
    } );
});
