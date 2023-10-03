import { promisify } from 'util';
import AppError from '../utils/appError';
import { to, ReE, ReS } from '../utils/util.service';
import { jwt_secret, jwt_expires_in, host, port } from '../config/config';
import { sendMail } from '../lib/email';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
const asyncHandler = require("express-async-handler");
import { User, Career, UserCareer } from '../models';
import { errorCode } from '../utils/util.helper';

//Đăng kí
const generateToken = (id) => {
    return jwt.sign({
        id
    },
        jwt_secret,
        {
            expiresIn: jwt_expires_in
        }
    );
};

export async function signUp(req, res, next) {
    const { fullname, email, password, isAdmin } = req.body;
    try {
        const userExists = await User.findOne({ where: { email } });
        //check if user exits
        if (userExists) {
            res.status(400);
            return ReE(res, 'User already exists', 404, errorCode.DataNull);

        }
        //hashpassword co
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user in DB 
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            isAdmin,
            enegy: 12,
            coin: 1000,
            stars: 0,
            level: 0
        });
        //if user create succufully 
        if (user) {
            // Lấy danh sách careerId từ bảng Career
            const careers = await Career.findAll();
            // Lấy mảng các careerId từ danh sách careers
            const careerIdsToAdd = careers.map(career => career.id);
            // const UserCareerDoc = await UserCareer.findAll();
            // res.json(UserCareerDoc);
            for (const careerId of careerIdsToAdd) {
                await UserCareer.create({
                    user_id: user.id,  // Giả định user.id là ID của người dùng vừa tạo
                    career_id: careerId
                });
            }
            res.status(201).json({
                id: user.id,
                fullName: user.fullname,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.id),
            });

        } else {
            return ReE(res, 'Invalid user data', 404, errorCode.DataNull);
        }
    } catch (error) {
        next(error);
    }
}

export async function submitNickname(req, res, next) {
    const userId = req.user.id;
    const { nickName, gender } = req.body;
    try {
        // Cập nhật thông tin nickname và gender cho người dùng trong cơ sở dữ liệu
        const updatedUser = await User.update(
            { nickName, gender },
            { where: { id: userId } } // Sử dụng userId để xác định người dùng cần cập nhật
        );
        if (updatedUser) {
            // Xử lý thành công, ví dụ, trả về một phản hồi hoặc chuyển hướng đến trang khác
            return ReE(res, 'Cập nhật nickname và gender thành công', 404, errorCode.DataNull);
        } else {
            return ReE(res, 'Không thể cập nhật nickname và gender', 404, errorCode.DataNull);
        }
    } catch (error) {
        next(error);
    }
}
export async function login(req, res, next) {
    const { email, password } = req.body;
    try {
        //find user in DB
        const user = await User.findOne({ where: { email } });
        //if user exists compare  password  with hashed password then send user dât and tokem to client
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            return ReE(res, 'Invalid user data', 404, errorCode.DataNull);
        }
    }
    catch (error) {
        next(error)
    }
};
export async function loginGoogle(req,res,next) {
res.json("Da chay den day");
};
// //getStartById
export async function getApiUser(req, res, next) {
    const userId = req.user.id;
    try {
      const AllStart = await UserCareer.findAll({
        where: { user_id: userId },
        include: [
          {
            model: User,
            as: 'user',
            attributes:['id','email','fullname','nickName','gender','coin','enegy']

          },
          {
            model: Career,
            as: 'career',
            attributes:['id','level']

          }
          
        ]
      });
      // Lấy thông tin của người dùng từ bất kỳ bản ghi nào trong AllStart
      const userInformation = {
        id: AllStart.length > 0 ? AllStart[0].user.id : null,
        email: AllStart.length > 0 ? AllStart[0].user.email : null,
        fullname: AllStart.length > 0 ? AllStart[0].user.fullname : null,
        gender: AllStart.length > 0 ? AllStart[0].user.gender : null,
        nickName: AllStart.length > 0 ? AllStart[0].user.nickName : null,
        isAdmin: AllStart.length > 0 ? AllStart[0].user.isAdmin : null,
        stars: AllStart.length > 0 ? AllStart[0].user.stars : null,
        coin: AllStart.length > 0 ? AllStart[0].user.coin : null,
        enegy:AllStart.length > 0 ? AllStart[0].user.enegy : null,
        level: AllStart.length > 0 ? AllStart[0].user.level : null,
        updatedAt: AllStart.length > 0 ? AllStart[0].user.updatedAt : null,
        createdAt: AllStart.length > 0 ? AllStart[0].user.createdAt : null
      };
      // Biến đổi dữ liệu để hiển thị userId 1 lần và danh sách career
      const result = {
        user: userInformation,
        careers: AllStart.map((start) => ({
          career_id: start.career.id,
          name: start.career.name,
          logo: start.career.logo,
          description: start.career.description,
          level:start.career.level,
          createdAt: start.career.createdAt,
          updatedAt: start.career.updatedAt
        }))
      };
      return ReS(
        res,
        {
          result
        },
        200
      );
    } catch (error) {
      next(error);
    }
  };
export async function getProfileUser(req, res, next) {
    const userId = req.user.id;
    try {
        const AllStart = await User.findAll({
            where: { id: userId },
            attributes:['id','email','fullname','nickName','gender','coin','enegy',]
        });
        // Lấy thông tin của người dùng từ bất kỳ bản ghi nào trong AllStart
        return ReS(
            res,
            {
                AllStart 
            },
            200
        );
    } catch (error) {
        next(error);
    }
};