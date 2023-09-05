import { QuestionsData } from '../Data/question.js';
// import { questionSets } from '../Data/Design.js';

const asyncHandler = require("express-async-handler");
import { Question, Answer, Career,GameHistory } from "../models";
// import { getTranslate } from '../utils/translate';
import { errorCode } from '../utils/util.helper';
import { ReE, ReS } from '../utils/util.service';
//Create Question
// exports.CreateQuestions = asyncHandler(async (req, res, next) => {
//     try {
//         const { name } = req.body;

//         if (!questionSets.hasOwnProperty(name)) {
//             // Kiểm tra xem ngành nghề có tồn tại trong danh sách không
//             return ReS(res, { message: "Invalid career name" }, 400);
//         }

//         const { logo, description } = req.body;
//         const [CareerDoc, createdCareer] = await Career.findOrCreate({
//             where: { name },
//             defaults: { logo, description },
//         });

//         const selectedQuestionSet = questionSets[name];
//         console.log("chay dến đay cbuaw");
//         for (const questionData of selectedQuestionSet) {
//             // Tạo câu hỏi
//             const [createdQuestion] = await Question.findOrCreate({
//                 where: { question: questionData.question },
//                 defaults: {
//                     explain: questionData.explain,
//                     careerId: CareerDoc.id,
//                 },
//             });
            
//             // Lấy câu hỏi vừa tạo để thêm các câu trả lời
//             const questionId = createdQuestion.id;

//             for (const answerData of questionData.answer) {
//                 // Tạo câu trả lời
//                 await Answer.findOrCreate({
//                     where: { questionId, answer: answerData.answer },
//                     defaults: { isCorrect: answerData.isCorrect },
//                 });
//             }
//         }
//         // Trả về thành công
//         ReS(res, { message: "Questions created successfully" });
//     } catch (error) {
//         next(error);
//     }
// });

//Create Question
exports.CreateQuestions = asyncHandler(async (req, res, next) => {
    try {
        const { name, logo, description } = req.body;
        const [CareerDoc, createdCareer] = await Career.findOrCreate({
            where: { name }, // Thêm điều kiện tìm kiếm
            defaults: { logo, description }, // Thêm dữ liệu mặc định nếu tạo mới
        });
        const { Design } = QuestionsData;
        for (const questionData of Design) {
            // Tạo câu hỏi
            const [createdQuestion] = await Question.findOrCreate({
                where: { question: questionData.question },
                defaults: {
                    explain: questionData.explain,
                    careerId: CareerDoc.id,
                },
            });
            // Lấy câu hỏi vừa tạo để thêm các câu trả lời
            const questionId = createdQuestion.id;

            for (const answerData of questionData.answer) {
                // Tạo câu trả lời
                await Answer.findOrCreate({
                    where: { questionId, answer: answerData.answer },
                    defaults: { isCorrect: answerData.isCorrect },
                });
            }
        }
        // Trả về thành công
        ReS(res, { message: "Questions created successfully" });
    } catch (error) {
        next(error);
    }
});

//getAllQuestions
exports.getAllQuestions = asyncHandler(async (req, res, next) => {
    try {
        // Lấy tất cả câu hỏi cùng với thông tin câu trả lời liên quan
        const questionsWithAnswers = await Question.findAll({
            include: {
                model: Answer,
                as: 'questions',
                // Sử dụng alias 'questions' đã định nghĩa trong quan hệ
            }
        });
        res.json(questionsWithAnswers);
    } catch (error) {
        next(error);
    }
});

// Get 12 questions from 50 questions
exports.getRamDomQuestion = async (req, res, next) => {
    try {
        const questionsList = await Question.findAll({
            include: {
                model: Answer,
                as: 'questions'
            }
        });
        console.log("Lay danh sach", questionsList);
        // Lấy ngẫu nhiên 12 câu hỏi từ danh sách
        const randomQuestions = questionsList.sort(() => Math.random() - 0.5).slice(0, 12);
        res.status(200).json(randomQuestions);
    } catch (error) {
        next(error);
    }
};

//Save historyGame 
exports.postHistoryGame = asyncHandler(async (req, res, next) => {
    try {
    const {enegy,stars,coin } = req.body;
    const gameHistoryDoc = await GameHistory.create({enegy,stars,coin});
    res.json(gameHistoryDoc);
    } catch (error) {
      next(error);
    }
  
  })