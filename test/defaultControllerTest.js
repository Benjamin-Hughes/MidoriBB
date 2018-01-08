const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Default Controller", () => {
    describe("Default", () => {
        it("Should return the index page", (done) => {
            chai.request("http://localhost:3000")
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });
});