const express= require("express")
const router= express.Router();
const AuthController=require("../controllers/AuthControllers");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/send-emailotp",AuthController.sendEmailOtp)
router.post('/verify-emailotp', AuthController.verifyEmailOtp);

//registertion
router.post('/register', AuthController.registerUser);
router.post('/verify-otp', AuthController.verifyOtp);
router.post('/complete-profile', AuthController.completeProfile);

router.post('/login', AuthController.loginUser);

router.post('/submitForm', AuthController.Form);


router.post('/reset-password/email', AuthController.restpassword);
router.post('/reset-password/verify-otp', AuthController.verifyResetOtp);
router.post('/reset-password/set-password', AuthController.setPassword);

//email
router.get("/google",AuthController.googlelogin)
router.get('/google/callback', AuthController.googleCallback);

router.get("/linkedin",AuthController.linkedinAuth);
router.get("/linkedin/callback",AuthController.linkedinCallback);


router.get("/userDetails",authMiddleware,AuthController.getUserDetails)

module.exports= router; 