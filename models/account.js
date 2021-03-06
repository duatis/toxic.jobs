/**
 * Created by duatis on 22/07/16.
 */
var db = require('../library/database.js');
var passportLocalMongoose = require('passport-local-mongoose');

var schema = {
    username: String,
    password: String,
    confirmed: Boolean,
    email: String
};
var _schema = new db.Schema(schema);
_schema.plugin(passportLocalMongoose);

module.exports =  db.model( "Account", _schema );

