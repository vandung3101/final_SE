const express = require('express');
const router = express.Router();
const flash = require("../app/middleware/flashMessage");

const accountController = require('../app/controllers/AccountController');

router.post('/login', flash, accountController.login);
router.get('/logout', accountController.logout);
router.post('/changePassword', accountController.changePassword);
router.get('/', accountController.renderLogin);
module.exports = router;
