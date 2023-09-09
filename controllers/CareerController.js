const { QuestionsData } = require('../Data/Design.js');
const asyncHandler = require("express-async-handler");

import { Career, Minigame, Task, GameHistory } from "../models";
import { errorCode } from '../utils/util.helper';
import { ReE, ReS } from '../utils/util.service';
//Create Question
//Create Career 
exports.createCareer = asyncHandler(async (req, res, next) => {
  try {
    const { name, logo, description } = req.body;
    const createCareer = await Career.create({ name, logo, description });
    console.log(createCareer);
    ReS(res, { message: "Career created successfully" });
  } catch (error) {
    next(error);
  }
});
//Create Task
exports.createTask = asyncHandler(async (req, res, next) => {
  try {
    const { name, logo, type, careerId, minigameId } = req.body;
    const createTask = await Task.create({ name, logo, type, careerId, minigameId });
    console.log(createTask);
    ReS(res, { message: "Task created successfully" });
  } catch (error) {
    next(error);
  }
});
//Create Minigames
exports.createMinigame = asyncHandler(async (req, res, next) => {
  try {
    const { name, logo, description } = req.body;
    const createMinigame = await Minigame.create({ name, logo, description });
    console.log(createMinigame);
    ReS(res, { message: "Minigame created successfully" });
  } catch (error) {
    next(error);
  }
});
//getAllCareer
exports.getAllCareer = asyncHandler(async (req, res, next) => {
  try {
    const AllCareer = await Career.findAll();
    return ReS(
      res,
      {
        AllCareer
      },
      200
    );
  } catch (error) {
    next(error);
  }
});
//getCareerById
exports.getCareerById = asyncHandler(async (req, res, next) => {
  try {
    const careerId = req.params.careerId;
    const careerById = await Career.findByPk(careerId);
    return ReS(
      res,
      {
        careerById 
      },
      200
  );
  } catch (error) {
    next(error)
  }
});
//getTaskByCareerId -lấy chi tiết ngành nghề và danh sách tác vụ
exports.getTaskByCareerId = asyncHandler(async (req, res, next) => {
  try {
    const careerId = req.params.careerId;
    const AllTaskCareerById = await Career.findByPk(careerId, {
      include: {
        model: Task,
        as: "relaCareer"
      }
    });
    if (!AllTaskCareerById) {
      return res.status(404).json({ message: 'Không tìm thấy ngành nghề với ID đã cho.' });
    }
    return ReS(
      res,
      {
        AllTaskCareerById
      },
      200
  );
  } catch (error) {
    next(error);
  }
});
//Lay chi tiết tác vụ 
exports.getTaskById = asyncHandler(async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const TaskById = await Task.findByPk(taskId);
    return ReS(
      res,
      {
        TaskById 
      },
      200
  );
  } catch (error) {
    next(error);
  }
});

exports.getTasksByCareer = async (req, res, next) => {
  try {
    const careerId = req.params.careerId;

    const tasksByCareer = await Task.findAll({
      where: {
        careerId: careerId,
      },
    });
    if (tasksByCareer.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tác vụ cho ngành nghề đã cho.' });
    }
    return ReS(
      res,
      {
        tasksByCareer 
      },
      200
  );
  } catch (error) {
    next(error);
  }
};
//getMinigameByIdTask
exports.getMinigameByIdTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const minigameByTask = await Minigame.findByPk(taskId);
    if (minigameByTask.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy tác vụ cho ngành nghề đã cho.' });
    }

    return ReS(
      res,
      {
        minigameByTask 
      },
      200
  );
  } catch (error) {
    next(error);
  }
};
