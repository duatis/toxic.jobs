/**
 * Created by duatis on 16/07/16.
 */
var chai = require('chai');
var expect = chai.expect;
var controller = require('../controllers/companyController');
var wrk = new controller();

var test_description = "01234567890123456789";
var doc = { name: (new Date()).getTime().toString(), description:test_description };

describe("Company controller", function()
{
    it("should implement all controller methods",
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

    it("findOne should return one object", function(done){

        wrk.findOne({name: {$ne:null}}, (err, data) =>{
            expect(data).to.be.an('Object');
            done();
        });
    });

    it("find should return an array", function(done){
        wrk.find({name: {$ne:null}}, (err, data) =>{
            expect(data).to.be.an('Array');
            done();
        });
    });

    it("should save a company to the database",function(done){
        wrk.findOne({name: {$ne:null}},(err,data)=>{
                var newName = data.name + "*";
                data.name = newName;
                 wrk.save(data, (err, data)=>{
                     expect(data.name).to.equal(newName);
                     done();
                 });
            }
        );
    });

    it("should create an save new document", (done) =>{
            wrk.count({},(err, data) => {
                var nRegs = data;
                wrk.create(doc, (err,data) => {
                    wrk.count({name: doc.name}, (err,data) =>{
                        expect(data).to.equal(1);
                        done();
                    });

                })
            });
        }
    );

    it("should remove documents from collection", (done) =>{
        wrk.count({},(err, data) => {
            var nRegs = data;
            wrk.create(doc, (err,data) => {
                wrk.remove({name: doc.name}, (err,data) => {
                    wrk.count({name: doc.name}, (err, data) => {
                        expect(data).to.equal(0);
                        done();
                    });
                });
            })
        });
    });

    it("should update several elements from collection", (done) =>{
        wrk.create(doc, (err,data) =>
        {
            wrk.create(doc, (err,data) =>
            {
               wrk.modify({name:doc.name}, {name: doc.name + "*"}, (err, data) =>{
                   wrk.count({name: doc.name + "*"}, (err,n) =>{
                        expect(n).to.equal(2);
                       done();
                   });
               });
            });
        });
    });

    it("should update only one element from collection", (done) =>{
        wrk.create(doc, (err,data) =>
        {
            wrk.create(doc, (err,data) =>
            {
                wrk.modifyOne(doc, {name: doc.name + "+"}, (err, data) =>{
                    wrk.count({name: doc.name + "+"}, (err,n) =>{
                        expect(n).to.equal(1);
                        done();
                    });
                });
            });
        });
    });

    it("company without name should return error", (done) =>{
        wrk.create({description: test_description}, (err,data) =>{
            expect(err).to.be.array;
            done();
        });
    });

    it("company with too short description should return error", (done) =>{
        wrk.create({name:"test company name"}, (err,data) =>{
            expect(err).to.be.array;
            done();
        });
    });

    it("create should save URID to access company", (done) =>{
        wrk.create({name:"test company name" + (new Date()).getTime().toString(),description:test_description}, (err,data) =>{
            expect(data.URID).to.equal(data.name.slug());
            done();
        });
    });

    it("shouldn't save companies with the same URID", (done) =>{
        wrk.create({name:doc.name,description:test_description}, (err,data) =>{
            wrk.create({name:doc.name,description:test_description}, (err,data) => {
                wrk.create({name:doc.name,description:test_description}, (err,data) => {
                    wrk.count({URID:data.URID}, (err,data)=>{
                        expect(data).to.equal(1);
                        done();
                    });
                });
            });
        });
    });
});