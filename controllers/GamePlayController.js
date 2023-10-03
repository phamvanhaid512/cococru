import { QuestionsData } from '../Data/question.js';
// import { questionSets } from '../Data/Design.js';
import moment from "moment";
import format from "format";
const asyncHandler = require("express-async-handler");
import { Question, Answer, Career, GameHistory, User } from "../models";
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
exports.CreateQuestions = asyncHandler(async (req, res, next) => {
    try {
        const { name, logo, description, careerId, taskId } = req.body; // Lấy careerId và taskId từ dữ liệu đầu vào
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
                    careerId: careerId, // Sử dụng careerId từ dữ liệu đầu vào
                    taskId: taskId, // Sử dụng taskId từ dữ liệu đầu vào
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

// Endp
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
        // Lấy ngẫu nhiên 12 câu hỏi dựa trên khóa ngoại "careerId" cụ thể (ví dụ: careerId = 1)
        const taskId = req.params.taskId; // Thay đổi giá trị careerId theo nhu cầu của bạn

        const questionsList = await Question.findAll({
            where: {
                taskId: taskId
            },
            attributes: ['id', 'question', 'explain']
            ,
            include: {
                model: Answer,
                as: 'answer'
                , attributes: ['id', 'answer', 'isCorrect']
            }
        });

        // Lấy ngẫu nhiên 12 câu hỏi từ danh sách
        const randomQuestions = questionsList.sort(() => Math.random() - 0.5).slice(0, 12);

        // Tạo ra một thời gian bắt đầu cou'ntdown từ 4 phút
        const countdownStart = new Date();
        countdownStart.setMinutes(countdownStart.getMinutes() + 4); // Thêm 4 phút

        return ReS(
            res,
            {
                randomQuestions,
                countdownStart // Trả về thời gian bắt đầu countdown
            },
            200
        );
    } catch (error) {
        next(error);
    }
};

exports.postHistoryGame = asyncHandler(async (req, res, next) => {
    try {
        const { energy_spent, get_stars, get_coin } = req.body;
        const userId = req.user.id; // Lấy userId từ req.user

        // Tạo một bản ghi mới trong bảng GameHistory và lưu userId vào trường userId
        const gameHistoryDoc = await GameHistory.create({ energy_spent, get_stars, get_coin, userId });

        // Cộng dồn giá trị từ gameHistoryDoc vào các trường energy, stars, và coin của người dùng
        const user = await User.findByPk(userId);
        if (user) {
            user.energy += energy_spent;
            user.stars += get_stars;
            user.coin += get_coin;

            // Lưu lại thông tin người dùng
            await user.save();
        }

        return ReS(
            res,
            {
                gameHistoryDoc
            },
            200
        );
    } catch (error) {
        next(error);
    }
});
