/**
 * Created by duatis on 13/07/16.
 */
     company    = require('./models/company.njs');
     express    = require('express');
     app        = express();

app.get('/', function(req,res){
    res.send('Toxic.jobs');
});
app.listen(3000);
