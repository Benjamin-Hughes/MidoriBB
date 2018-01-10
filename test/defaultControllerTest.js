process.env.NODE_ENV = 'test';
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const models = require("../models");

chai.use(chaiHttp);

describe("Default Controller", function() {
    
    before(function() {
        models.Topic.findOrCreate({ where: { title: 'Introduce yourself', description: 'New here? Come say hi' }})
        .spread((topic, created) => {
            console.log(topic.get({
                plain: true
            }));
            console.log(created);
        });
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