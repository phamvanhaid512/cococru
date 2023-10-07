const fs = require('fs');
const { QuestionsData } = require('../Data/Design.js');
const asyncHandler = require("express-async-handler");
import { user } from "../config/mailer";
import { Career, Minigame, Task, GameHistory, UserCareer, User } from "../models";
import { errorCode } from '../utils/util.helper';
import { ReE, ReS } from '../utils/util.service';
import { deleteFile } from '../lib/deletefile';
import { createCareer } from '../dao/career.dao'
//Create Career 

export const AddCareer = async (req, res, next) => {
  const file = req.file;
  const { name, description } = req.body;
  if (name.length > 50) {
    deleteCareerAfterFailure(file);
    return ReE(res, 'Over limit', 403);
  }
  if (!file) {
    deleteCareerAfterFailure(file);
    return ReE(res,'Missing Data Field', 400);
  }
  try {
    const createdCareer = await createCareer(name, file.filename, description );
    if ( createdCareer)
      return ReS(
        res,
        {
          message: 'Create Bussiness successfully ',
          direcotry: `public/careers/${file.filename}`,

        },
        200
      );

  } catch (error) {
    console.log("loi te le");
    // nếu mà k thành công thì xóa hình.
    if (file)   deleteCareerAfterFailure(file);
    next(error);
  }
}
export const UpdateCareer = async (req, res, next) => {
  const { id } = req.params;
  const file = req.file;
  const { name, description } = req.body;

  if (name.length > 50) {
    // Xử lý lỗi khi tên quá dài
    deleteCareerAfterFailure(file);
    return ReE(res, 'Over limit', 403);
  }

  if (!file && !name) {
    // Xử lý lỗi khi thiếu dữ liệu
    deleteCareerAfterFailure(file);
    return ReE(res, 'Missing Data Field', 400);
  }

  try {
    const careerToUpdate = await Career.findByPk(id);

    if (!careerToUpdate) {
      // Xử lý lỗi khi không tìm thấy career với ID tương ứng
      return ReE(res, 'Career not found', 404);
    }

    if (file) {
      // Nếu có file (logo), cập nhật logo
      careerToUpdate.logo = `public/careers/${file.filename}`;
    }

    if (name) {
      // Nếu có tên, cập nhật tên
      careerToUpdate.name = name;
    }

    if (description) {
      // Nếu có mô tả, cập nhật mô tả
      careerToUpdate.description = description;
    }

    await careerToUpdate.save(); // Lưu thay đổi vào cơ sở dữ liệu

    return ReS(res, {
      message: 'Update Career successfully',
      directory: `public/careers/${file.filename}`
    }, 200);
  } catch (error) {
    console.log("loi te le");
    // Xử lý lỗi và xóa hình (nếu có)
    if (file) deleteCareerAfterFailure(file);
    next(error);
  }
}

//Create Task
export const UpdateTask = async (req, res, next) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    // Xử lý lỗi khi không có file (logo)
    return ReE(res, 'Missing Logo File', 400);
  }

  try {
    const taskToUpdate = await Task.findByPk(id);

    if (!taskToUpdate) {
      // Xử lý lỗi khi không tìm thấy task với ID tương ứng
      return ReE(res, 'Task not found', 404);
    }

    // Cập nhật logo của task
    taskToUpdate.logo = `public/tasks/${file.filename}`;

    await taskToUpdate.save(); // Lưu thay đổi vào cơ sở dữ liệu

    return ReS(res, {
      message: 'Update Task Logo successfully',
      directory: `public/tasks/${file.filename}`
    }, 200);
  } catch (error) {
    console.log("loi te le");
    // Xử lý lỗi
    next(error);
  }
}


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

  try {
    const AllStart = await Career.findAll();
    return ReS(
      res,
      {
        AllStart
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
    const careerId = req.params.careerId;
    const tasksByCareer = await Task.findAll({
      where: {
        careerId: careerId,
      },
      attributes: ['id', 'name', 'logo', 'type', 'description', 'timeStart', 'enegy_lost', 'enegy_get', 'coin']
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
    const taskId = req.params.taskId;
    const TaskById = await Task.findByPk(taskId,
      {
        attributes: ['id', 'name', 'logo', 'type', 'description', 'timeStart', 'enegy_lost', 'enegy_get', 'coin']
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
const deleteCareerAfterFailure = (file) => {
  let urlLogo = 'public/career/' + file.filename;
  deleteFile(urlLogo);
};