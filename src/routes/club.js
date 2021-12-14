const express = require('express');
const router = express.Router();
const checkClub = require('../app/middleware/checkClub');

const clubController = require('../app/controllers/ClubController');

router.use(checkClub);

router.get('/home', clubController.renderHome);
router.post('/check-in', clubController.checkin);

module.exports = router;