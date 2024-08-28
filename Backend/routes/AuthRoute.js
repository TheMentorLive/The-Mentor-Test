const express= require("express")
const router= express.Router();
const AuthController=require("../controllers/AuthControllers");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/send-emailotp",AuthController.sendEmailOtp)
router.post('/verify-emailotp', AuthController.verifyEmailOtp);

//email
router.post("/google-login",AuthController.googlelogin)
router.get("/userDetails",authMiddleware,AuthController.getUserDetails)

module.exports= router; 