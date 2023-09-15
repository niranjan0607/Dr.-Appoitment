const express = require("express");

const {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes

//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

// Auth || POST
router.post("/getUserData", authMiddleware, authController);

// Apply doctor || post
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Notification || POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController);
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

//get All doctors
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);

router.post('/book-appointment', authMiddleware,bookAppointmentController);

router.post('/booking-availability',authMiddleware,bookingAvailabilityController);

router.get('/user-appointments',authMiddleware,userAppointmentsController);
module.exports = router;