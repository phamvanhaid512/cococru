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
exports.getTaskQuesstions = asyncHandler(async (req, res,next) => {
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
exports.CreateQuestions = asyncHandler(async (req, res, next) => {
  console.log("Chạy đến đây");
  try {
    // Tìm hoặc tạo danh mục "Design" trong cơ sở dữ liệu
    const [designCategory, created] = await Category.findOrCreate({
      where: { name: "Design" }
    });
    // Nếu danh mục "Design" vừa được tạo mới, hãy in thông báo
    if (created) {
      console.log('Đã tạo danh mục "Design"');
    }
    // Thêm danh sách câu hỏi vào danh mục "Design"
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
    console.log('Đã thêm câu hỏi vào danh mục "Design"');
    res.status(201).json(questionDoc);
  } catch (error) {
    next(error);
  }
});
//Get 12 questions from 50 questions

exports.getTwentyQuestion = async (req, res, next) => {
  try {
    // const categoryId = req.query.categoryId; // Lấy categoryId từ query parameters

    const categoryId= req.params.categoryId;
    // Lấy danh mục từ cơ sở dữ liệu dựa trên categoryId
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Questions, as: 'questions' }],
    });
    console.log("Id", categoryId);

    console.log("category:", category);
    if (!category) {
      console.log('Không tìm thấy danh mục');
      return res.status(404).json({ error: 'Không tìm thấy danh mục' });
    }

    const questionsList = await Questions.findAll({
      where: { categoryId: categoryId }
    });
    console.log("Lay danh sach", questionsList);
    // Lấy ngẫu nhiên 12 câu hỏi từ danh sách
    const randomQuestions = questionsList.sort(() => Math.random() - 0.5).slice(0, 12);

    res.status(200).json(randomQuestions);
  } catch (error) {
    next(error);

  }
};
// exports.getTwentyQuestion = asyncHandler(async (req, res) => {
//   try {
//     const allQuestions = await Questions.findAll();
//     const totalQuestions = allQuestions.length;
//     if (totalQuestions <= 5) {
//       res.json(allQuestions); // Trả về tất cả câu hỏi nếu số lượng câu hỏi ít hơn hoặc bằng 5.
//     } else {
//       const shuffledIndices = shuffleArray([...Array(totalQuestions).keys()]);
//       const selectedIndices = shuffledIndices.slice(0, 5);

//       const selectedQuestions = selectedIndices.map(index => allQuestions[index]);

//       res.json(selectedQuestions);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }
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
