const account = require('./account');
const citizen = require('./citizen');
const admin = require('./admin');
const club = require('./club');
const report = require('./report');
const service = require('./service');
function route(app) {
    app.use('/admin', admin);
    app.use('/citizen', citizen);
    app.use('/club', club);
    app.use('/report', report);
    app.use('/service', service);
    app.use('/', account);
}

module.exports = route;