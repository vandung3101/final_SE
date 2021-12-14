const Account = require('../models/Account');
const Apartment = require('../models/Apartment');
const Notification = require('../models/Notification');
const Service = require('../models/Service');
const CheckinHistory = require('../models/CheckinHistory');
class CitizenController {
    async renderHome(req, res) {
        const account = req.account;
        const apartment = await Apartment.findOne({ account: account._id });
        const notifications = await Notification.find({}).sort({ date: -1 }).lean();
        res.render('./citizen/home', { account, apartment, notifications });
    }

    async renderNoti(req, res) {
        const account = req.account;
        const notify = await Notification.find({}).sort({ date: -1 });
        res.render('citizen/notification', { account, notify });
    }

    async renderServices(req, res) {
        const account = req.account;
        const services = await Service.find({ citizen: account._id }).sort({ date: -1 }).lean();
        const notifications = await Notification.find({}).sort({ date: -1 }).lean();
        res.render('citizen/services', { account, services, notifications });
    }

    async sendServiceRequest(req, res) {
        const account = req.account;
        if (req.body.type === "dichoho") {
            const service = new Service({
                type: "Market",
                price: 20000,
                content: req.body.content,
                citizen: account._id,
                status: "pending",
            });
            await service.save();
            res.redirect('/citizen/services');
        } else {
            const service = new Service({
                type: "Clean room",
                price: 100000,
                content: req.body.content,
                citizen: account._id,
                status: "pending",
            });
            await service.save();
            res.redirect('/citizen/services');
        }
    }

    async renderClub(req, res) {
        const account = req.account;
        const checkin = await CheckinHistory.find({ citizen: account._id }).sort({ date: -1 }).lean();
        const notifications = await Notification.find({}).sort({ date: -1 }).lean();
        res.render('./citizen/club', { account, checkin, notifications });
    }

    async registerClub(req, res) {
        const account = await Account.findById(req.account._id);
        const clubCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        account.clubCode = clubCode;
        await account.save();
        res.redirect('/citizen/club');
    }
}
module.exports = new CitizenController;