import express from 'express';
import { db_name, host, port as _port } from './config/config';
import config from 'dotenv';
import { sequelize } from './models/index.js';
import QuestionRouter from './routes/QuestionsRoutes.js';
import CareerRouter from './routes/CareerRoutes.js';
import globalErrHandler from './controllers/errorController';
const port = _port;
const app = express();
app.use(express.json()); // Sử dụng express.json() để xử lý dữ liệu JSON
app.get("/api/questions/", (req, res, next) => {
      res.json("test");
});
//router
app.use("/api/questions/",QuestionRouter)
app.use("/api/careers/",CareerRouter);
//error handler
// handle undefined Routes
app.use('*', (req, res, next) => {
      const err = new AppError(404, 'fail', 'undefined route');
      next(err, req, res, next);
  });
  
  app.use(globalErrHandler);

app.listen(port, () => {
      console.log(`Application is running on port ${port}`);
});
