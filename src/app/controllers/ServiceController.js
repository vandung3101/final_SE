const Service = require('../models/Service');
const Notification = require('../models/Notification');
class ServiceController {
    async renderHome(req, res) {
        const account = req.account;
        const services = await Service.find({}).sort({ date: -1 }).lean();
        const notifications = await Notification.find({}).sort({ date: -1 }).lean();
        res.render('./service/home', { account, services, notifications });
    }

    async confirmService(req, res) {
        const { id } = req.params;
        await Service.findOneAndUpdate(
            { _id: id },
            { status: "Done" });
        res.redirect('back');
    }

    async cancelService(req, res) {
        const { id } = req.params;
        await Service.findOneAndUpdate(
            { _id: id },
            { status: "Cancel" });
        res.redirect('back');
    }

    async renderNotify(req, res) {
        const account = req.account;
        const notifications = await Notification.find({}).lean();
        res.render('service/notify', { account, notifications });
    }

    async createNotify(req, res) {
        const { title, content } = req.body;
        const notification = new Notification({
            title,
            content
        });
        await notification.save();
        res.redirect('back');
    }
}
module.exports = new ServiceController;