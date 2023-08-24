const express = require('express');
const QuestionController = require('../controllers/QuestionController.js')
const router = express.Router();

router.get("/getTaskQuesstion/:categoryId",QuestionController.getTaskQuesstions);
router.post("/createCategory",QuestionController.CreateCategory);
router.post("/createQuestion",QuestionController.CreateQuestions);
router.get("/getTwentyQuestion/:categoryId",QuestionController.getTwentyQuestion);
// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé
module.exports = router;
