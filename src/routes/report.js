const express = require('express');
const router = express.Router();
const checkReport = require('../app/middleware/checkReport');
const multer = require('multer');
const reportController = require('../app/controllers/ReportController');
router.use(checkReport);

router.get('/home', reportController.renderHome);
router.post('/upload', multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname );
  }
}) }).single("report"), reportController.upload);

module.exports = router;