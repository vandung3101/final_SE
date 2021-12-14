const Apartment = require('../models/Apartment');
const Account = require('../models/Account');
const Report = require('../models/Report');
const bcrypt = require('bcrypt');
class AdminController {
    async renderHome(req, res) {
        const account = req.account;
        const apartments = await Apartment.find({}).lean();
        res.render('./admin/home', { account, apartments });
    }

    async createApartment(req, res) {
        const account = req.account;
        const { floor_number, department_number, people, fee, description, phone, name, username } = req.body;
        const password = await bcrypt.hash(phone, 10);

        const accountData = {
            username,
            password,
            name,
            phone,
            role: 'citizen',
            clubCode: "",
        }

        const accountCreated = await Account.create(accountData);
        const apartment = new Apartment({
            floor_number,
            department_number,
            account: accountCreated._id,
            people,
            phone,
            fee,
            description,
        });
        await apartment.save();
        res.redirect('/admin/home');
    }

    async renderEditApartment(req, res) {
        const account = req.account;
        const { id } = req.params;
        const apartments = await Apartment.findOne({ _id: id }).lean();
        res.render('./admin/editApartment', { account, apartments });
    }


    async deleteApartment(req, res) {
        const account = req.account;
        const { id } = req.params;
        const deleteAp = await Apartment.findByIdAndDelete(id);
        const deleteAcc = await Account.findByIdAndDelete(deleteAp.account);
        res.redirect('/admin/home');
    }

    async editApartment(req, res) {
        const account = req.account;
        const { id } = req.params;
        const data = req.body;
        await Apartment.findByIdAndUpdate(id, data);
        res.redirect('/admin/home');
    }

    async renderEmployee(req, res) {
        const account = req.account;
        const employees = await Account.find({ role: { $nin: ['admin', 'citizen'] } }).lean();
        res.render('./admin/employee', { account, employees });
    }

    async renderEditEmployee(req, res) {
        const account = req.account;
        const { id } = req.params;
        const employee = await Account.findOne({ _id: id }).lean();
        res.render('./admin/editEmployee', { account, employee });
    }

    async deleteEmployee(req, res) {
        const account = req.account;
        const { id } = req.params;
        await Account.findByIdAndDelete(id);
        res.redirect('/admin/employee');
    }

    async createEmployee(req, res) {
        const account = req.account;
        const { username, name, role, phone } = req.body;
        const password = await bcrypt.hash(phone, 10);
        const accountData = {
            username,
            password,
            name,
            phone,
            role,
            is_register: false
        }
        const accountCreated = await Account.create(accountData);
        res.redirect('back');
    }

    async editEmployee(req, res) {
        const account = req.account;
        const { id } = req.params;
        const data = req.body;
        await Account.findByIdAndUpdate(id, data);
        res.redirect('/admin/employee');
    }

    async renderReport(req, res) {
        const account = req.account;
        const reports = await Report.find({}).lean();
        res.render('./admin/report', { account, reports });
    }
}
module.exports = new AdminController;