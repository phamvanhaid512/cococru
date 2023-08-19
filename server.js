const express = require('express');
const app = express();
const port = 5000;

const connectDb = require('./config/config.js');
const Questions = require('./models/QuestionsModel.js');
//Router
const questionRouter = require('./routes/QuestionsRoutes.js')

//other router api
app.get("/api/questions/", (req, res, next) => {
      res.json("hahaha");
});

app.use("/api/questions/",questionRouter);
app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
});