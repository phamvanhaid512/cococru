const express = require('express');
const GamePlayController = require('../controllers/GamePlayController.js')
const authController = require('./../controllers/authController.js')
const router = express.Router();
router.use(authController.protect);
router.post("/createQuestion", GamePlayController.CreateQuestions);
router.get("/getAllQuestion", GamePlayController.getAllQuestions);
router.get("/getRamDomQuestion/:taskId", GamePlayController.getRamDomQuestion);
//historyGame
router.post("/postHistoryGame", GamePlayController.postHistoryGame);
module.exports = router;
