const express = require('express');
const CareerController = require('../controllers/CareerController.js')
const authController = require('./../controllers/authController.js')

const router = express.Router();
router.use(authController.protect);
router.post("/createCareer",CareerController.createCareer);
router.post("/createTask",CareerController.createTask);
router.post("/createMinigame",CareerController.createMinigame);
router.get("/getAllCareer",CareerController.getAllCareer);
router.get("/getCareerById/:careerId",CareerController.getCareerById);
router.get("/getTaskByCareerId/:careerId",CareerController.getTaskByCareerId);
router.get("/getTaskById/:taskId",CareerController.getTaskById);
router.get("/getTasksByCareer/:careerId",CareerController.getTasksByCareer);
// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé
module.exports = router;
