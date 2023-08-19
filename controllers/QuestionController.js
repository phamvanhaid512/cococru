const { QuestionsData } = require('../Data/praprices')
const asyncHandler = require("express-async-handler");
const Questions = require('../models/QuestionsModel.js');

exports.getAllQuesstions = asyncHandler(async (req, res) => {
  try {
    res.json("Pham vanhai");

  } catch (error) {

  }
});
//Create questions

exports.CreateQuestions = asyncHandler(async (req, res) => {
  console.log("chay đến đây");
  try {
    await Questions.destroy({ truncate: true }); // Xóa tất cả dữ liệu trong bảng
    // Sau đó, bạn insert dữ liệu mới
    console.log("chay đến đây111");

    const questions = await Questions.bulkCreate(QuestionsData); // Giả sử QuestionsData là dữ liệu bạn muốn insert
    res.status(201).json(questions);
    console.log("chay đến đây222");

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.getTwentyQuestion = asyncHandler(async (req, res) => {
  try {
    const allQuestions = await Questions.findAll();
    const totalQuestions = allQuestions.length;

    if (totalQuestions <= 5) {
      res.json(allQuestions); // Trả về tất cả câu hỏi nếu số lượng câu hỏi ít hơn hoặc bằng 5.
    } else {
      const shuffledIndices = shuffleArray([...Array(totalQuestions).keys()]);
      const selectedIndices = shuffledIndices.slice(0, 5);

      const selectedQuestions = selectedIndices.map(index => allQuestions[index]);

      res.json(selectedQuestions);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
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
