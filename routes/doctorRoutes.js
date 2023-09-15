const express =require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController,updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController }=require('../controllers/doctorCtrl');
const router = express.Router();

//post SINGLE DOC INFO
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);
router.post('/updateProfile',authMiddleware,updateProfileController);
// get single doc
router.post('/getDoctorById', authMiddleware,getDoctorByIdController);
router.get('/doctor-appointments',authMiddleware,doctorAppointmentsController);

router.post('/update-status',authMiddleware, updateStatusController);

module.exports = router;


 