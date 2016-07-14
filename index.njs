/**
 * Created by duatis on 13/07/16.
 */
var  db         = 'mongodb://localhost/toxic_jobs',
     mongoose   = require('mongoose').connect(db);
     company    = require('./models/company.njs');
     companies  = require('./controllers/companyController.njs')(company(mongoose));
     express    = require('express');
     app        = express();

app.get('/', function(req,res){
    res.send('Toxic.jobs');
});
app.listen(3000);
