const { QuestionsData } = require('../Data/Design.js');
const asyncHandler = require("express-async-handler");
import { user } from "../config/mailer";
import { Career, Minigame, Task, GameHistory, UserCareer, User, UserTask } from "../models";
import { errorCode } from '../utils/util.helper';
import { ReE, ReS } from '../utils/util.service';

//Create Career 
exports.createCareer = asyncHandler(async (req, res, next) => {
  try {
    const { name, logo, description } = req.body;
    const createCareer = await Career.create({ name, logo, description, level: 1 });
    console.log(createCareer);
    ReS(res, { message: "Career created successfully" });
  } catch (error) {
    next(error);
  }
});
//Create Task
// exports.createTask = asyncHandler(async (req, res, next) => {
//   try {
//     const { name, logo, type, description, careerId,timeStart } = req.body;
//     const createTask = await Task.create({ name, logo, type, description, careerId});
//     console.log(createTask);
//     ReS(res, { message: "Task created successfully" });
//   } catch (error) {
//     next(error);
//   }
// });
//Create Task
exports.createTask = asyncHandler(async (req, res, next) => {
  try {
    const { name, logo, type, description, careerId } = req.body;
    const createTask = await Task.create({ name, logo, type, description, careerId, timeStart: 600, enegy_lost: 4, enegy_get: 2 });
    console.log(createTask);

    ReS(res, { message: "Task created successfully" });
  } catch (error) {
    next(error);
  }
});
//getStartById
// exports.getAllCareer = asyncHandler(async (req, res, next) => {
//   const userId = req.user.id;
//   try {
//     const AllStart = await Career.findAll({
//       // where: { id: userId }
//     });
//     // Biến đổi dữ liệu để hiển thị userId 1 lần và danh sách career

//     return ReS(
//       res,
//       {
//         AllStart
//       },
//       200
//     );
//   } catch (error) {
//     next(error);
//   }
// });
// //getStartById
export async function getAllCareer(req, res, next) {
  const userId = req.user.id;
  try {
    const AllStart = await UserCareer.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Career,
          as: 'career',
          attributes: ['id', 'name', 'logo', 'description']

        }
      ]
    });
    // Lấy thông tin của người dùng từ bất kỳ bản ghi nào trong AllStart
    const tasks = await Task.findAll();
    const TaskIdsToAdd = tasks.map(task => task.id);
    
    for (const taskId of TaskIdsToAdd) {
      const [userTask, created] = await UserTask.findOrCreate({
        where: {
          user_id: userId,
          task_id: taskId,
        },
      });
    
   
    }
    // Biến đổi dữ liệu để hiển thị userId 1 lần và danh sách career
    const result = {

      careers: AllStart.map((start) => ({
        career_id: start.career.id,
        name: start.career.name,
        logo: start.career.logo,
        description: start.career.description
      }))
    };
    return ReS(
      res,
      {
        result
      },
      200
    );
  } catch (error) {
    next(error);
  }
};
//getCareerById
export async function getCareerById(req, res, next) {
  try {
    const careerId = req.params.careerId;
    const careerById = await Career.findByPk(careerId, {
      attributes: ['id', 'name', 'logo', 'description']
    });

    if (!careerById) {
      // Xử lý trường hợp không tìm thấy sự nghiệp
      return ReS(res, { message: 'Không tìm thấy sự nghiệp' }, 404);
    }

    return ReS(res, { careerById }, 200);
  } catch (error) {
    next(error);
  }
};
export async function getTasksByCareer(req, res, next) {
  try {
    const user_id = req.user.id;

    const careerId = req.params.careerId;

    const tasksByCareer = await Task.findAll({
      where: {
        careerId: careerId,
      
      },
      attributes: ['id', 'name', 'logo', 'type', 'description', 'timeStart', 'enegy_lost', 'enegy_get']
      ,include: [
        {
          model: User,
          attributes: ['id', 'coin'],
          as: 'user',
          through: { attributes: [] },
          where: { id: user_id }, // Đặt điều kiện ở đây
        }
      ]
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
// getTaskByCareerId -lấy chi tiết ngành nghề và danh sách tác vụ
exports.getTaskById = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const taskId = req.params.taskId;
    const TaskById = await Task.findByPk(taskId,
      {
        attributes: ['id', 'name', 'logo', 'type', 'description', 'timeStart', 'enegy_lost', 'enegy_get']
        ,include: [
          {
            model: User,
            attributes: ['id', 'coin'],
            as: 'user',
            through: { attributes: [] },
            where: { id: user_id }, // Đặt điều kiện ở đây
          }
        ]
      }
    );
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
