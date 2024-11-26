const express= require("express")
const router= express.Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const AdminController=require("../controllers/AdminControllers");

router.get("/getUsers",authMiddleware,AdminController.getUsers)
// router.get("/getMessages",authMiddleware,AdminController.getMessages)
// router.get("/applications",authMiddleware,AdminController.getApplication)

router.post("/addSubject",authMiddleware,AdminController.addSubject)
router.get("/getSubjects",authMiddleware,AdminController.getSubjects)
router.delete("/deleteSubject/:id",authMiddleware,AdminController.deleteSubject)

router.post("/addTest",authMiddleware,AdminController.createTest);
router.post("/save-test",AdminController.saveTest);
router.get("/getFormdata",authMiddleware,AdminController.getFormData)
router.get("/getMockTest",authMiddleware,AdminController.getMockTests)
router.get("/getMainTest",authMiddleware,AdminController.getMainTests)
router.put("/editMockTest/:id",authMiddleware,AdminController.editMockTests)
router.delete("/deleteMockTest/:id",authMiddleware,AdminController.deleteMockTest)
router.get("/getMockTestDetails/:id",authMiddleware,AdminController.getMockDetails)

router.post("/addCourse",authMiddleware,AdminController.addCourse)
router.get("/getCourse",AdminController.getCourse)
router.delete("/deleteCourse",AdminController.deleteCourse)
router.put("/updateCourse/:id",AdminController.updateCourse)


router.post("/addJobs",authMiddleware,AdminController.addJobs)
router.get("/getJobs",authMiddleware,AdminController.getJobs)
router.get("/getAllJobs",authMiddleware,AdminController.getAllJobs)


module.exports= router; 