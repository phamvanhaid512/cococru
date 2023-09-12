const express = require('express');
const GamePlayController = require('../controllers/GamePlayController.js')
const router = express.Router();
router.post("/createQuestion",GamePlayController.CreateQuestions);
router.get("/getAllQuestion",GamePlayController.getAllQuestions);
router.get("/getRamDomQuestion/:taskId",GamePlayController.getRamDomQuestion);
//historyGame
router.post("/postHistoryGame",GamePlayController.postHistoryGame);
module.exports = router;
