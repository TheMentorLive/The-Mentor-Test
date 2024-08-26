const express= require("express")
const router= express.Router();
const AuthController=require("../controllers/AuthControllers");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/register",AuthController.register)
router.post("/login",AuthController.login)
//mobile login
router.post("/send-otp",AuthController.sendMobileOtp)
router.post('/verify-otp', AuthController.verifyMobileOtp);

router.post("/send-emailotp",AuthController.sendEmailOtp)
router.post('/verify-emailotp', AuthController.verifyEmailOtp);

//email
router.post("/sendmail",AuthController.sendMail)
// router.post('/verify-otp', AuthController.verifyOtp);
router.get("/userDetails",authMiddleware,AuthController.getUserDetails)

module.exports= router; 