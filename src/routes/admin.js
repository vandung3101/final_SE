const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const checkAdmin = require('../app/middleware/checkAdmin');

const adminController = require('../app/controllers/AdminController');
router.use(checkAdmin);

router.get('/home', adminController.renderHome);
router.post('/apartment', adminController.createApartment);
router.get('/apartment/:id/edit', adminController.renderEditApartment);
router.post('/apartment/:id', adminController.editApartment);
router.delete('/apartment/:id', adminController.deleteApartment);

router.get('/employee', adminController.renderEmployee);
router.get('/employee/:id/edit', adminController.renderEditEmployee)
router.post('/employee', adminController.createEmployee);
router.post('/employee/:id', adminController.editEmployee);
router.delete('/employee/:id', adminController.deleteEmployee);

router.get('/report', adminController.renderReport);



module.exports = router;