const { QuestionsData } = require('../Data/praprices')
const asyncHandler = require("express-async-handler");
const Questions = require('../models/QuestionsModel.js');
const Category = require('../models/CategoriesModel.js');
// import { getTranslate } from '../utils/translate';
import { errorCode } from '../utils/util.helper';
import { ReE, ReS } from '../utils/util.service';
import { createCategory } from '../dao/questionDao';
//Create Categories 
exports.CreateCategory = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    // const language = 'vi';
    const createdBussiness = await createCategory(name);
    if (createdBussiness) {
      return ReS(
        res,
        {
          message: 'Create Category successfully'
        },
        200
      );
    }
  } catch (error) {
    next(error);
  }
});
exports.getTaskQuesstions = asyncHandler(async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    // Truy vấn dữ liệu từ hai bảng dựa trên categoryId
    const questions = await Questions.findAll({
      where: {
        categoryId: categoryId,
      },
      include: [{ model: Category, as: 'category' }],
      // Sử dụng include để kết hợp bảng Categories
    });
    res.json(questions); // Gửi kết quả về client
  } catch (error) {
    next(error);
  }
});
//Create questions get from File DATA
// exports.CreateQuestions = asyncHandler(async (req, res, next) => {
//   console.log("Chạy đến đây");
//   try {
//     // Tìm hoặc tạo danh mục "Design" trong cơ sở dữ liệu
//     const [designCategory, created] = await Category.findOrCreate({
//       where: { name: "Công nghệ thông tin" }
//     });
//     // Nếu danh mục "Design" vừa được tạo mới, hãy in thông báo
//     if (created) {
//       console.log('Đã tạo danh mục "Design"');
//     }
//     // Thêm danh sách câu hỏi vào danh mục "Design"
//     const questionDoc = await Promise.all(
//       QuestionsData.map(question => {
//         return Questions.create({
//           nameTask: question.nameTask,
//           question: question.question,
//           answer2: question.answer2,
//           answer3: question.answer3,
//           answer4: question.answer4,
//           CorrectAnswer: question.CorrectAnswer,
//           explain: question.explain,
//           time: question.time,
//           categoryId: designCategory.id
//         });
//       })
//     );
//     console.log('Đã thêm câu hỏi vào danh mục "Design"');
//     res.status(201).json(questionDoc);
//   } catch (error) {
//     next(error);
//   }
// });
exports.CreateQuestions = asyncHandler(async (req, res, next) => {
  console.log("Chạy đến đây");
  try {
    // Tìm danh mục "Công nghệ thông tin" trong cơ sở dữ liệu
    const [designCategory, created] = await Category.findOrCreate({
      where: { name: "Design" },
      defaults: { name: "Design" } // Tạo mới nếu không tìm thấy
    });
    // Nếu không tìm thấy danh mục, bạn có thể tạo mới ở đây
    if (!designCategory) {
      const createdCategory = await Category.create({ name: "Design" });
      console.log('Design"');
      designCategory = createdCategory;
    }

    // Kiểm tra nếu đã có câu hỏi trong danh mục "Công nghệ thông tin"
    const existingQuestions = await Questions.findAll({
      where: { categoryId: designCategory.id },
      include: [{ model: Category,as:'category', attributes: ['name'] }]
    });
    // Nếu chưa có câu hỏi, thêm câu hỏi vào danh mục
    if (existingQuestions.length === 0) {
      const questionDoc = await Promise.all(
        QuestionsData.map(question => {
          return Questions.create({
            nameTask: question.nameTask,
            question: question.question,
            answer2: question.answer2,
            answer3: question.answer3,
            answer4: question.answer4,
            CorrectAnswer: question.CorrectAnswer,
            explain: question.explain,
            time: question.time,
            categoryId: designCategory.id
          });
        })
      );
      console.log('Đã thêm câu hỏi vào danh mục "Công nghệ thông tin"');
      res.status(201).json(questionDoc);
    } else {
      console.log('Danh mục "Công nghệ thông tin" đã có câu hỏi');
      res.status(200).json(existingQuestions);
    }
  } catch (error) {
    next(error);
  }
});
//Get 12 questions from 50 questions
exports.getTwentyQuestion = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    // Lấy danh mục từ cơ sở dữ liệu dựa trên categoryId
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Questions, as: 'questions' }],
    });
    if (!category) {
      console.log('Không tìm thấy danh mục');
      return res.status(404).json({ error: 'Không tìm thấy danh mục' });
    }
    const questionsList = await Questions.findAll({
      where: { categoryId: categoryId },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['name'] // Chọn trường cần lấy từ bảng Category
      }]
    });
    console.log("Lay danh sach", questionsList);
    // Lấy ngẫu nhiên 12 câu hỏi từ danh sách
    const randomQuestions = questionsList.sort(() => Math.random() - 0.5).slice(0, 12);

    res.status(200).json(randomQuestions);
  } catch (error) {
    next(error);
  }
};
exports.CheckAswerQuestions = asyncHandler(async (req, res) => {
  try {
    const userAnswer = req.body.answer; // Giả sử req.body.answer chứa câu trả lời của người dùng
    const questionId = req.body.questionId; // Giả sử req.body.questionId chứa ID của câu hỏi
    // Tìm câu hỏi trong cơ sở dữ liệu
    const question = await QuestionsModule.findByPk(questionId);
    console.log(question);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    const correctAnswer = question.CorrectAnswer; // Đáp án đúng từ cơ sở dữ liệu
    // So sánh câu trả lời của người dùng với đáp án đúng
    if (userAnswer === correctAnswer) {
      return res.status(200).json({ result: "Correct answer" });
    } else {
      return res.status(200).json({ result: "Incorrect answer" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
