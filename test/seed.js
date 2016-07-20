/**
 * Created by duatis on 20/07/16.
 */
var faker      = require('faker'),
    company    = new (require('../controllers/companyController.js')),
    comment    = new (require('../controllers/commentController.js')),
    i  = 20;

company.remove({}, (err,data) => {
    comment.remove({}, (err,data) => {
        for (; i--;) {
            var _company = {
                name: faker.name.findName(),
                description: faker.lorem.paragraph(),
                email: faker.internet.email()
            };

            ((j) => {
                company.create(_company, (err, data)=> {
                    var _comment1 = {text: faker.lorem.paragraph(), _company: data._id};
                    var _comment2 = {text: faker.lorem.paragraph(), _company: data._id};
                    comment.create(_comment1, (err, data) => {
                        comment.create(_comment2, (err, data) => {
                            if (j == 0)process.exit();
                        });
                    });
                });
            })(i);
        }
    });
});
