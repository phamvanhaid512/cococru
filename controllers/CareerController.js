const { QuestionsData } = require('../Data/Design.js');
const asyncHandler = require("express-async-handler");

import { Career, Minigame, Task,GameHistory } from "../models";
import { errorCode } from '../utils/util.helper';
import { ReE, ReS } from '../utils/util.service';
//Create Question
//getAllCareer
exports.getAllCareer = asyncHandler(async (req, res, next) => {
  try {
    const careerDoc = await Career.findAll();
    res.json(careerDoc);
  } catch (error) {
    next(error);
  }
});
//getCareerById
exports.getCareerById = asyncHandler(async (req, res, next) => {
  try {
    const careerId = req.params.careerId;
    const careerDoc = await Career.findByPk(careerId);
    console.log(careerId);
    res.json(careerDoc);
  } catch (error) {
    next(error)
  }
});
//getTaskByCareerId -lấy chi tiết ngành nghề và danh sách tác vụ
exports.getTaskByCareerId = asyncHandler(async (req, res, next) => {
  try {
    const careerId = req.params.careerId;
    const career = await Career.findByPk(careerId, {
      include: {
        model: Task,
        as: "relaCareer"
      }
    });
    if (!career) {
      return res.status(404).json({ message: 'Không tìm thấy ngành nghề với ID đã cho.' });
    }
    res.json(career);
  } catch (error) {
    next(error);
  }
});
//Lay chi tiết tác vụ 
exports.getTaskById = asyncHandler(async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const taskDoc = await Task.findByPk(taskId);
    res.json(taskDoc);
  } catch (error) {
    next(error);
  }
});

exports.getTasksByCareer = async (req, res, next) => {
  try {
    const careerId = req.params.careerId;

    const tasks = await Task.findAll({
      where: {
        careerId: careerId,
      },
    });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tác vụ cho ngành nghề đã cho.' });
    }

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
//getMinigameByIdTask
exports.getMinigameByIdTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const minigameDoc = await Minigame.findByPk(taskId);
    if (minigameDoc.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tác vụ cho ngành nghề đã cho.' });
    }

    res.json(minigameDoc);
  } catch (error) {
    next(error);
  }
};
