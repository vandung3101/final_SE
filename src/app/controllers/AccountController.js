const bcrypt = require('bcrypt');
const Account = require('../models/Account');
const setFlashMessage = require('../lib/setFlashMessage')


class AccountController {
    renderLogin(req, res) {
        delete req.session.user_id;
        res.render('./login');
    }

    async login(req, res, next) {
        let password = req.body.password;
        let username = req.body.username;
        let account = await Account.findOne({ username });
        if (account) {
            if (bcrypt.compareSync(password, account.password)) {
                req.session.user_id = account._id;
                if (account.role === "admin") {
                    res.redirect("./admin/home");
                } else if (account.role === "citizen") {
                    res.redirect("./citizen/home");
                } else if (account.role === "report") {
                    res.redirect("./report/home");
                }
                else if (account.role === "service") {
                    res.redirect("./service/home");
                } else {
                    res.redirect("./club/home");
                }
            } else {
                req.session.flash = setFlashMessage('error', 'Invalid account', "Tài khoản hoặc mật khẩu không chính xác");
                res.redirect("/");
            }
        } else {
            req.session.flash = setFlashMessage('error', 'Invalid account', "Tài khoản hoặc mật khẩu không chính xác");
            res.redirect("/");
        }
    }

    logout(req, res, next) {
        delete req.session.user_id;
        res.redirect("/");
    }

    async changePassword(req, res, next) {
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        if (newPassword !== confirmPassword) {
            res.send("Mật khẩu không khớp");
        } else {
            const hash = await bcrypt.hash(newPassword, 10);
            await Account.findOneAndUpdate(
                { _id: req.session.user_id },
                { password: hash }
            );
            res.redirect("/logout");
        }
    }
}
module.exports = new AccountController;