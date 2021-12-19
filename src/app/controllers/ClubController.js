const Account = require('../models/Account');
const CheckinHistory = require('../models/CheckinHistory');
const Apartment = require('../models/Apartment');

class ClubController {
    async renderHome(req, res) {
        const account = req.account;
        const checkinHistory = await CheckinHistory.find({}).sort({ date: -1 }).lean();
        res.render('./club/home', { account, checkinHistory });
    }


    async checkin(req, res) {
        const account = req.account;
        // find account by clubCode
        const citizen = await Account.findOne({ clubCode: req.body.clubCode });
        const apartment = await Apartment.findOne({ account: citizen._id });
        if (!citizen) {
            return res.redirect('back');
        } else {
            const checkinHistory = new CheckinHistory({
                citizen: citizen._id,
                citizenName: req.body.citizenName + " " + apartment.floor_number + "." + apartment.department_number,
                date: new Date(),
                checkinBy: account.name,
            });
            await checkinHistory.save();
            res.redirect('back');
        }
    }

}
module.exports = new ClubController;