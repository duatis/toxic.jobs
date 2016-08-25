/**
 * Created by duatis on 20/07/16.
 */
var faker      = require('faker'),
    company    = new (require('../controllers/companyController')),
    comment    = new (require('../controllers/commentController')),
    account    = (require('../models/account')),
    question   = (require('../models/question')),
    answers    = [];


company.remove({}, (err,data) => {
    comment.remove({}, (err,data) => {
        question.remove({}, (err, data)=> {
            question.create({text: "Question 1"}, (error, data)=>{
                question.create({text: "Question 2"}, (error, data)=>{
                    if(error) return console.log(error);
                    question.create({text: "Question 3"},(error, data)=>{
                        if(error) return console.log(error);
                        question.create({text: "Question 4"},(error, data)=>{
                            if(error) return console.log(error);
                            question.find({}, (error, data)=>{
                                if(error) return console.log(error);
                                data.forEach((item) =>{ answers.push({_question: item._id, score: 1}); });
                                account.register({username: 'seeder'}, 'seed', (err, response) => {
                                    if (err) console.error(err);

                                    for (let i = 20; i--;) {
                                        var _company = {
                                            name: faker.name.findName(),
                                            description: faker.lorem.paragraph(),
                                            email: faker.internet.email(),
                                            _account: response._id,
                                            answers: answers
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

                        });
                    });
                });
            });



        });
        account.remove({username:'seeder'}, (err, data) => {

    });
});
