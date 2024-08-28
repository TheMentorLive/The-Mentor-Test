const express= require("express")
const router= express.Router();
const AuthController=require("../controllers/AuthControllers");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/send-emailotp",AuthController.sendEmailOtp)
router.post('/verify-emailotp', AuthController.verifyEmailOtp);

//email
router.get("/google",AuthController.googlelogin)
router.get('/google/callback', AuthController.googleCallback);

router.get("/linkedin",AuthController.linkedinAuth);
router.get("/linkedin/callback",AuthController.linkedinCallback);


router.get("/userDetails",authMiddleware,AuthController.getUserDetails)

module.exports= router; 