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

router.post("/addTest",authMiddleware,AdminController.createTest)





module.exports= router; 