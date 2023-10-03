import express from 'express';
import { db_name, host, port as _port } from './config/config';
import config from 'dotenv';
// require('./passport');
import UserRouter from './routes/UserRoutes.js';
import AppError from './utils/appError';

// import QuestionRouter from './routes/QuestionsRoutes.js';
import GamePlayRouter from './routes/GamePlayRoutes.js';
import CareerRouter from './routes/CareerRoutes.js';
import globalErrHandler from './controllers/errorController';
import { sequelize } from './models';

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to SQL database:', db_name);
    })
    .catch((err) => {
        console.error('Unable to connect to SQL database:', db_name);
    });
    (async () => {
        await sequelize.sync();
        console.log('----server start', new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
        console.log('----server process');
        console.log('----server ready', host + ':' + _port);
    })();
         
const port = _port;
const app = express();
app.use(express.json()); // Sử dụng express.json() để xử lý dữ liệu JSON
app.get("/api/questions/", (req, res, next) => {
      res.json("test");
});

//set thoi gian
//router
app.use("/api/users/", UserRouter);
app.use("/api/gamePlay/", GamePlayRouter);
app.use("/api/careers/", CareerRouter);
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
