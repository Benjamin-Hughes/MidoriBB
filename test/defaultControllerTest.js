process.env.NODE_ENV = 'test';
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const models = require("../models");
let exec = require('child_process').exec;

chai.use(chaiHttp);

describe("Default Controller", function() {

    beforeEach('clear and add', function(done) {
        exec('sequelize db:seed:undo:all --env test', function(err) {
            if (err !== null) {
                console.log('exec error:' + err);
            }
        })
        exec('sequelize db:seed:all --env test', function(err) {
            if (err !== null) {
                console.log('exec error:' + err); 
            }
        })
        done();
    });

    describe("Default", function() {
        it("Should return the index page", function(done) {
            chai.request("http://localhost:3000")
            .get("/")
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
        });
    });
});