const express= require("express")
const router= express.Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const UserController=require("../controllers/UserController");

router.get("/getTests",authMiddleware,UserController.getTests)
router.get("/getTestsLanding",authMiddleware,UserController.getTestsLanding)
router.post("/submitTest",authMiddleware,UserController.SubmitTest)
router.get("/results",authMiddleware,UserController.getResults);
router.get("/history",authMiddleware,UserController.getHistory);


//GUEST USER ROUTES

router.get("/getGuestJobs",UserController.guestJobs);


module.exports= router; 