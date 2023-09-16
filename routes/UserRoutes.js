const express = require('express');
const UserController = require('../controllers/UserController.js');
const authController = require('./../controllers/authController.js')

const router = express.Router();

router.post("/login",UserController.login);
router.post("/signUp",UserController.signUp);
router.use(authController.protect);

router.post("/submitNickname",UserController.submitNickname);
router.get("/getProfileUser",UserController.getProfileUser)
router.get("/getApiUser",UserController.getApiUser);
router.get("/job",(req,res,next)=>{
    res.json("phamvanhai");
    console.log("job-run")
});
module.exports = router;
