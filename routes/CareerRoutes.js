const express = require('express');
const CareerController = require('../controllers/CareerController.js')
const router = express.Router();

router.get("/getAllCareer",CareerController.getAllCareer);
router.get("/getCareerById/:careerId",CareerController.getCareerById);
router.get("/getTaskByCareerId/:careerId",CareerController.getTaskByCareerId);
router.get("/getTaskById/:taskId",CareerController.getTaskById);
router.get("/getTasksByCareer/careers/:careerId/tasks",CareerController.getTasksByCareer);
//minigame
router.get("/getMinigameByIdTask/:taskId",CareerController.getMinigameByIdTask);



// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé
module.exports = router;
