// import { QuestionsData }  from '../Data/praprice.js';
// const asyncHandler = require("express-async-handler");
// const Questions = require('../models/QuestionsModel.js');
// const Answer = require('../models/AnswerModel.js');
// // import { getTranslate } from '../utils/translate';
// import { errorCode } from '../utils/util.helper';
// import { ReE, ReS } from '../utils/util.service';
// //Create Question

// exports.CreateQuestions = asyncHandler(async (req, res, next) => {
//   try {
//     // Xóa tất cả dữ liệu trong bảng questions và answers trước khi tạo mới
//     await Answer.destroy({ where: {} });
//     await Questions.destroy({ where: {} });
//     // Lặp qua mảng QuestionsData để chèn dữ liệu vào bảng questions và answers
//     for (const questionData of QuestionsData) {
//       const { question, explain, answer } = questionData;
//       // Chèn dữ liệu vào bảng questions
//       const createdQuestion = await Questions.create({
//         question, explain
//       });
//       // Lặp qua mảng câu trả lời và chèn dữ liệu vào bảng answers
//       for (const ans of answer) {
//         await Answer.create({
//           contentAs: ans.answer,
//           isCorrect: ans.isCorrect,
//           questionId: createdQuestion.id
//         });
//       }
//     }

//     res.status(200).json({ message: "Dữ liệu đã được chèn thành công." });
//   } catch (error) {
//     next(error);
//   }
// });

// //getAllQuestions
// exports.getAllQuestions = asyncHandler(async (req, res, next) => {
//   try {
//     // Lấy tất cả câu hỏi cùng với thông tin câu trả lời liên quan
//     const questionsWithAnswers = await Questions.findAll({
//       include: {
//         model: Answer,
//         as: 'relaQuestions',
//         // Sử dụng alias 'questions' đã định nghĩa trong quan hệ
//       }
//     });
//     res.json(questionsWithAnswers);
//   } catch (error) {
//     next(error);
//   }
// });

// // Get 12 questions from 50 questions
// exports.getRamDomQuestion = async (req, res, next) => {
//   try {
//     const questionsList = await Questions.findAll({
//       include: {
//         model: Answer,
//         as: 'relaQuestions'
//       }
//     });
//     console.log("Lay danh sach", questionsList);
//     // Lấy ngẫu nhiên 12 câu hỏi từ danh sách
//     const randomQuestions = questionsList.sort(() => Math.random() - 0.5).slice(0, 12);
//     res.status(200).json(randomQuestions);
//   } catch (error) {
//     next(error);
//   }
// };
