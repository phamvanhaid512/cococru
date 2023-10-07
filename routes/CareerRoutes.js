const fs = require('fs');
const express = require('express');
import upload from '../lib/upload';
const CareerController = require('../controllers/CareerController.js')
const authController = require('./../controllers/authController.js')

const router = express.Router();
router.use(authController.protect);
router.post("/AddCareer",upload.uploadCareer.single('logo'),CareerController.AddCareer);
router.post("/UpdateCareer/:id",upload.uploadCareer.single('logo'),CareerController.UpdateCareer);

router.post("/createTask",CareerController.createTask);
router.post("/UpdateTask/:id",upload.uploadTask.single('logo'),CareerController.UpdateTask);

router.get("/getAllCareer",CareerController.getAllCareer);
router.get("/getCareerById/:careerId",CareerController.getCareerById);
router.get("/getTasksByCareer/:careerId",CareerController.getTasksByCareer);
router.get("/getTaskById/:taskId",CareerController.getTaskById);
// router.post("/checkQuestions/:questionId",QuestionController.CheckAswerQuestions); api này chưa sài được nhé
module.exports = router;
