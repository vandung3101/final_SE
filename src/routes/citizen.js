const express = require('express');
const router = express.Router();
const checkCitizen = require('../app/middleware/checkCitizen');

const citizenController = require('../app/controllers/CitizenController');
router.use(checkCitizen);

router.get('/home', citizenController.renderHome);
router.get('/notify', citizenController.renderNoti);
router.get('/services', citizenController.renderServices);
router.post('/send-service-request', citizenController.sendServiceRequest);
router.get('/club', citizenController.renderClub);
router.post('/club', citizenController.registerClub);
module.exports = router;