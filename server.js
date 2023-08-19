import express from 'express';
import { db_name, host, port as _port } from './config/config';
import config from 'dotenv';
import { sequelize } from './models/index.js';
import QuestionRouter from './routes/QuestionsRoutes.js';
const port = _port;
const app = express();
app.get("/api/questions/", (req, res, next) => {
      res.json("test");
});
//router
app.use("/api/questions/",QuestionRouter)

app.listen(port, () => {
      console.log(`Application is running on port ${port}`);
});
