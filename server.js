import express  from 'express';
import { db_name, host, port as _port } from './config/config';
import  config  from 'dotenv';
import { sequelize } from './models/index.js';
const Question = require('./models/QuestionsModel.js');
const port = _port;
const app = express();
app.get("/api/questions/", (req, res, next) => {
      res.json("hahaha");
});

app.listen(port, () => {
      console.log(`Application is running on port ${port}`);
});
// process.on('unhandledRejection', (err) => {
//       console.log('UNHANDLED REJECTION!!!  shutting down ...');
//       console.log(err.name, err.message);
//       server.close(() => {
//             process.exit(1);
//       });
// });
