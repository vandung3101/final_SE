const bcrypt = require("bcrypt");
const Account = require('../app/models/Account.js');
async function createAdminAccount() {
    let acc = await Account.findOne({ role: 'admin' })
    if (!acc) {
        let password = bcrypt.hashSync('123456', 10);
        let data = {
            username: "admin",
            role: "admin",
            password: password,
        };
        const account = new Account(data)
        await account.save();
    }
}
module.exports = { createAdminAccount };