const express = require('express');
const router = express.Router();
const checkService = require('../app/middleware/checkService');

const serviceController = require("../app/controllers/ServiceController");
router.use(checkService);

router.get('/home', serviceController.renderHome);
router.get("/notify", serviceController.renderNotify);
router.post("/notify", serviceController.createNotify);
router.get('/confirm/:id', serviceController.confirmService);
router.get("/cancel/:id", serviceController.cancelService);
module.exports = router;