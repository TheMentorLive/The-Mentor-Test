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


router.get("/upcommingTest",UserController.upcommingGuestTest);
router.get("/guestExamType",UserController.guestExamType);
router.get("/test-by-Type",UserController.guestTestByType);
router.get("/test-by-id",UserController.guestTestById);

router.post("/create-payment",UserController.createPayment);
router.post("/verify-payment",authMiddleware,UserController.verifyPayment);
router.get("/paid-test",authMiddleware,UserController.paidTest);
router.get("/dashboard-data",authMiddleware,UserController.dashboardData);




module.exports= router; 