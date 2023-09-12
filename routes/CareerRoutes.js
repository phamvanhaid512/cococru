const express = require('express');
const CareerController = require('../controllers/CareerController.js')
const router = express.Router();
router.post("/createCareer",CareerController.createCareer);
router.post("/createTask",CareerController.createTask);
router.post("/createMinigame",CareerController.createMinigame);
router.get("/getStartById/:userId",CareerController.getStartById);
router.get("/getCareerById/:careerId",CareerController.getCareerById);
router.get("/getTaskByCareerId/:careerId",CareerController.getTaskByCareerId);
router.get("/getTaskById/:taskId",CareerController.getTaskById);
router.get("/getTasksByCareer/:careerId",CareerController.getTasksByCareer);
// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé
module.exports = router;
