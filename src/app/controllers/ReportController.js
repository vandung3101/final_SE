const Report = require('../models/Report');
const fs = require('fs');
class ReportController {
    async renderHome(req, res) {
        const account = req.account
        const reports = await Report.find({}).lean();
        res.render('./report/home', { account, reports });
    }

    async upload(req, res) {
        const account = req.account;
        const { name, description } = req.body;
        let url = req.file.path;
        url = url.slice(11);
        const report = await Report.create({
            name,
            description,
            url,
            createdBy: account.name,
        });
        res.redirect("back");
    }
}
module.exports = new ReportController;