/**
 * Created by duatis on 14/07/16.
 */

var db        =  'mongodb://localhost/toxic_jobs',
    mongoose   = require('mongoose').connect(db);

module.exports = mongoose;