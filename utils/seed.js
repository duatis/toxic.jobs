/**
 * Created by duatis on 20/07/16.
 */
var faker      = require('faker'),
    company    = new (require('../controllers/companyController')),
    comment    = new (require('../controllers/commentController'));
    account    = (require('../models/account'));

company.remove({}, (err,data) => {
    comment.remove({}, (err,data) => {
        account.register({username:'seeder'}, 'seed', (err, response) => {
        for (let i  = 20; i--;) {
            var _company = {
                name: faker.name.findName(),
                description: faker.lorem.paragraph(),
                email: faker.internet.email(),
                _account: response._id
            };

                company.create(_company, (err, data)=> {
                    var _comment1 = {text: faker.lorem.paragraph(), _company: data._id};
                    var _comment2 = {text: faker.lorem.paragraph(), _company: data._id};
                    comment.create(_comment1, (err, data) => {
                        comment.create(_comment2, (err, data) => {
                            if (i == 0) {
                                console.log("Done");
                                process.exit();
                            }
                        });
                    });
                });
            }
        });
    });
});
