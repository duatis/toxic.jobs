/**
 * Created by duatis on 22/07/16.
 * Test for account
 */
var chai = require('chai');
var expect = chai.expect;
var Account = require('../models/account');
var faker = require('faker');

var username = faker.name.findName();
var password = faker.internet.password();

describe('Account', function() {

    beforeEach(function(done) {
        var account = new Account({
            username: username
        });

        Account.register(account,password,function(error, account) {
            if (error) console.log('error' + error.message);
            else console.log('no error');
            done();
        });
    });

    it('find a user by username', function(done) {
        Account.findOne({ username: username }, function(err, account) {
            expect(account.username).to.eql(username);
            done();
        });
    });



   afterEach(function(done) {
        Account.remove({}, function() {
            done();
        });
    });

});

