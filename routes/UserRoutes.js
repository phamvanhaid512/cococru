const express = require('express');
const UserController = require('../controllers/UserController.js')
const router = express.Router();

router.get("/getAllUser",UserController.getAllUser);



// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé
module.exports = router;
