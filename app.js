import  express  from "express";
import rateLimit from 'express-rate-limit'; //Giới hạn việc gửi và gọi api 
import helmet from 'helmet'; //Cung cap co che bao mat 
// import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import { init, configure } from "i18n";
const i18n = require("i18n");

import routes  from './routes/indexRoutes';

import globalErrHandler from './controllers/errorController';
