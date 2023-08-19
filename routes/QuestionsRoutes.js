const express = require('express');
const QuestionController = require('../controllers/QuestionController.js')
const router = express.Router();

router.get("/getAllQuesstion",QuestionController.getAllQuesstions);
router.post("/createQuestion",QuestionController.CreateQuestions);
router.get("/getTwentyQuestion",QuestionController.getTwentyQuestion);
// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé

module.exports = router;