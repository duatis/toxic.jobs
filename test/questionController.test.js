/**
 * Created by duatis on 13/08/16.
 */
var chai = require('chai');
var expect = chai.expect;
var controller = require('../controllers/companyController');
var wrk = new controller();

describe('question controller', (done)=>{
    it("should implement all controller's methods",
        function(done)
        {
            expect(controller).to.respondTo('find');
            expect(controller).to.respondTo('findOne');
            expect(controller).to.respondTo('save');
            expect(controller).to.respondTo('create');
            expect(controller).to.respondTo('count');
            expect(controller).to.respondTo('remove');
            expect(controller).to.respondTo('modify');
            expect(controller).to.respondTo('modifyOne');
            done();
        }
    );

    it('return array of questions', (done)=>{
        wrk.find({}, (err, res) =>
        {
           expect(res).to.be.array;
            done();
        });
    });
})