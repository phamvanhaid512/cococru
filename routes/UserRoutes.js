const express = require('express');
const UserController = require('../controllers/UserController.js')
const router = express.Router();

router.get("/getAllUser",UserController.getAllUser);
router.get("/job",(req,res,next)=>{
    res.json("phamvanhai");
    console.log("job-run")
});



// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé
module.exports = router;
