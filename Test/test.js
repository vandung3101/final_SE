const expect = require("chai").expect;
const app = require("../src/index");
const agent = require("superagent").agent();
let Cookies;

describe("Test Admin", function () {
    // login before test
    before(function (done) {
        agent
            .post("/login")
            .send({ username: "admin", password: "123456" })
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                Cookies = res.req._headers.cookie;
                done();
            });
    }
    );

    it("GET Home of admin", function (done) {
        agent
            .get("/admin/home")
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

    it("Create apartment", function (done) {
        agent
            .post("/admin/apartment")
            .send({
                username: "username1",
                name: "name1",
                people: "people1 385235, people2 32528975, people3 32528975",
                phone: "0339607003",
                floor_number: "1",
                department_number: "5",
                fee: "50000",
                description: "description1",
            })
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Create employee", function (done) {
        agent
            .post("/admin/employee")
            .send({
                username: "username2",
                name: "name2",
                phone: "0339607003",
                role: "club",
            })
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

    it("Get all aparment", function (done) {
        agent
            .get("/admin/apartment")
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it("Get all employee", function (done) {
        agent
            .get("/admin/employee")
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

describe("Test Citizen", function () {
    // login before test
    before(function (done) {
        agent
            .post("/login")
            .send({ username: "vanhung", password: "0339607003" })
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                Cookies = res.req._headers.cookie;
                done();
            });
    }
    );

    it("GET Home of citizen", function (done) {
        agent
            .get("/citizen/home")
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

    it("GET all service", function (done) {
        agent
            .get("/citizen/services")
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

    it("Create service", function (done) {
        agent
            .post("/citizen/send-service-request")
            .send({
                type: "dichoho",
                content: "dichoho test",
            })
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

    it("Citizen register Club", function (done) {
        agent
            .post("/citizen/club")
            .send({})
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

    it("GET all checkin history", function (done) {
        agent
            .get("/citizen/club")
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

});

describe("Test Service Employee", function () {
    // login before test
    before(function (done) {
        agent
            .post("/login")
            .send({ username: "staff2", password: "0339607003" })
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                Cookies = res.req._headers.cookie;
                done();
            });
    }
    );

    it("GET all services", function (done) {
        agent
            .get("/service/home")
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
    }
    );

    // it("GET all notify", function (done) {
    //     agent
    //         .get("/service/notify")
    //         .set("Cookie", Cookies)
    //         .end(function (err, res) {
    //             expect(res.status).to.equal(200);
    //             done();
    //         });
    // }
    // );

    it("Create notify", function (done) {
        agent
            .post("/service/notify")
            .send({
                title: "title",
                content: "content",
            })
            .set("Cookie", Cookies)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });

    });

});






