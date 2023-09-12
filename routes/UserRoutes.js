const express = require('express');
const UserController = require('../controllers/UserController.js')
const router = express.Router();
router.post("/login",UserController.login);
router.post("/signUp",UserController.signUp);
router.post("/submitNickname/:userId",UserController.submitNickname);
// router.get("/getAllUser",UserController.getAllUser);
router.get("/job",(req,res,next)=>{
    res.json("phamvanhai");
    console.log("job-run")
});
module.exports = router;
